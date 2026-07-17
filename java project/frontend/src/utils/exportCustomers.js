import { calculateCustomerHealthScore, getHealthStatus } from './customerInsights'

function escapeCell(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function buildRows(customers) {
  return customers
    .map((customer, index) => {
      const score = calculateCustomerHealthScore(customer)
      const status = getHealthStatus(score)

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeCell(customer.customerName)}</td>
          <td>${escapeCell(customer.email)}</td>
          <td>${escapeCell(customer.phone)}</td>
          <td>${escapeCell(customer.city)}</td>
          <td>${score}</td>
          <td>${escapeCell(status.label)}</td>
        </tr>
      `
    })
    .join('')
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function exportCustomersToExcel(customers) {
  const table = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Health Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${buildRows(customers)}</tbody>
    </table>
  `

  const blob = new Blob([table], {
    type: 'application/vnd.ms-excel;charset=utf-8;',
  })

  downloadBlob(blob, 'customers-health-report.xls')
}

export function exportCustomersToPDF(customers) {
  const printableHtml = `
    <!doctype html>
    <html>
      <head>
        <title>Customer Health Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #536071; padding: 28px; }
          h1 { color: #6f63d8; margin-bottom: 4px; }
          p { color: #7a8699; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th, td { border: 1px solid #dce6f8; padding: 10px; text-align: left; }
          th { background: #eef5ff; color: #6f63d8; }
          tr:nth-child(even) { background: #f9fbff; }
        </style>
      </head>
      <body>
        <h1>Customer Health Report</h1>
        <p>Generated from Customer Management System</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Health Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${buildRows(customers)}</tbody>
        </table>
        <script>
          window.onload = () => {
            window.print();
          };
        </script>
      </body>
    </html>
  `

  const reportWindow = window.open('', '_blank', 'width=1100,height=800')
  if (reportWindow) {
    reportWindow.document.write(printableHtml)
    reportWindow.document.close()
  }
}
