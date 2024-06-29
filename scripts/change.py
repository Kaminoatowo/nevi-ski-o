import os
import sys
import fileinput

n = len(sys.argv)

if n == 0:

  print("Text to search for:")
  textToSearch = input("> ")

  print("Text to replace it with:")
  textToReplace = input("> ")

  print("File to perform Search-Replace on:")
  fileToSearch = input("> ")

else:

  fileToSearch = sys.argv[1]
  textToSearch = sys.argv[2]
  textToReplace = sys.argv[3]

# Read in the file
with open(fileToSearch, 'r') as file:
  filedata = file.read()

# Replace the target string
filedata = filedata.replace(textToSearch, textToReplace)

# Write the file out again
with open(fileToSearch, 'w') as file:
  file.write(filedata)
