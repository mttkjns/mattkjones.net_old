# the idea right now is to seperate content from the generation
# take contents and build against the last version of generator that was pushed
# copy to public repo which is just the static files. that gets hosted.

# clean output directory
$rm = Get-ChildItem .\public\ -Recurse
foreach ($item in $rm) {
   Remove-Item $item.FullName -Recurse -Force
}

hugo -d .\public

Write-Output "Build output to .\public"