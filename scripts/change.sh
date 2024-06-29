#!/bin/bash
# This script will change entries in files in a directory
ROOT="/mnt/c/Users/Jacopo/Codes/WebApps/svelte-app/nevi-ski-o_deploy"
DIRECTORY="$ROOT/src/routes/stations"
# Check if the directory exists
if [[ ! -d "$DIRECTORY" ]]; then
    echo "Directory $DIRECTORY does not exist"
    exit 1
fi
# Pattern to search for
PATTERN="*.md"
# Loop through files in the directory
for file in "$DIRECTORY"/*; do
    # Check if the file is a text file
    if [[ ! -f "$file" ]]; then
        echo "$file is not a file"
        continue
    fi
    if [[ "$file" != $PATTERN ]]; then
        echo "$file does not match the pattern"
        continue
    fi
    # Change the entries in the file
    python3 change.py "$file" "$1" "$2"
    echo "Changed entries in $file"
done
#echo ` python3 change.py random.txt ciao aloha` 