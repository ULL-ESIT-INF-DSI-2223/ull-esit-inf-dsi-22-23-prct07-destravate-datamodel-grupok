#!/bin/bash

if [ -z "$1" ]
then
  git add .
  git commit -m "BackUp"
  git push
else
  git add .
  git commit -m "$1"
  git push
fi
