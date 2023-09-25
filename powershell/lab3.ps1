# Get machine's IP address
$IPAddress = (Test-Connection -ComputerName $env:COMPUTERNAME -Count 1).IPv4Address.IPAddressToString

# Get username
$Username = $env:USERNAME

# Get hostname
$Hostname = $env:COMPUTERNAME

# Get PowerShell version
$PSVersion = $PSVersionTable.PSVersion

# Get current date
$CurrentDate = Get-Date -Format "dddd, MMMM dd, yyyy"

# Create $Body variable
$Body = "This machine's IP is $IPAddress. User is $Username. Hostname is $Hostname. PowerShell Version $PSVersion. Today's Date is $CurrentDate"

# Save $Body to text file
$Body | Out-File -FilePath "output.txt"

# Data saved
Write-Host "Data saved as output.txt"
