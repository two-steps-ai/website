$imageFiles = Get-ChildItem -Path .\public\*.png, .\public\*.jpg, .\public\*.jpeg

foreach ($file in $imageFiles) {
    $url = Get-Content $file.FullName

    # Extract just the filename without path
    $fileName = $file.Name
    $outputPath = ".\temp_images\$fileName"
    
    Write-Host "Downloading $fileName from $url"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Downloaded $fileName successfully"
    } catch {
        Write-Host "Failed to download $fileName`: $_"
    }
}

Write-Host "All downloads completed!" 