import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendDir = path.resolve(__dirname, '..')
const backendDir = path.resolve(frontendDir, '..', 'backend')

const processes = []

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function run(label, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'inherit',
    env: process.env,
  })

  processes.push(child)

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${label} stopped with exit code ${code}`)
    }
  })

  return child
}

function stopAll() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill()
    }
  }
}

process.on('SIGINT', () => {
  stopAll()
  process.exit(0)
})

process.on('SIGTERM', () => {
  stopAll()
  process.exit(0)
})

async function isBackendRunning() {
  try {
    const response = await fetch('http://localhost:8080/api/customers')
    return response.ok
  } catch {
    return false
  }
}

async function waitForBackend(child) {
  const timeoutMs = 90_000
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (await isBackendRunning()) {
      return
    }

    if (child.exitCode !== null) {
      throw new Error(`Spring Boot backend stopped before it was ready with exit code ${child.exitCode}`)
    }

    await delay(1_500)
  }

  throw new Error('Spring Boot backend did not become ready within 90 seconds')
}

if (await isBackendRunning()) {
  console.log('Spring Boot backend is already running on http://localhost:8080')
} else {
  console.log('Starting Spring Boot backend on http://localhost:8080')
  const backend = run('Backend', 'mvn', ['spring-boot:run'], backendDir)
  console.log('Waiting for backend API to become ready...')
  await waitForBackend(backend)
  console.log('Backend API is ready at http://localhost:8080/api/customers')
}

console.log('Starting React frontend on http://localhost:5173')
run('Frontend', 'npx', ['vite', '--host', '0.0.0.0'], frontendDir)
