# Backup original public directory
Copy-Item -Path .\public -Destination .\public_backup -Recurse

# Delete the URL text files from public directory
$imageFiles = Get-ChildItem -Path .\public\*.png, .\public\*.jpg, .\public\*.jpeg
foreach ($file in $imageFiles) {
    Remove-Item -Path $file.FullName -Force
    Write-Host "Deleted URL text file: $($file.Name)"
}

# Copy the downloaded image files to public directory
$downloadedFiles = Get-ChildItem -Path .\temp_images\*
foreach ($file in $downloadedFiles) {
    Copy-Item -Path $file.FullName -Destination ".\public\$($file.Name)"
    Write-Host "Copied image file: $($file.Name) to public directory"
}

Write-Host "All images have been replaced successfully!" 