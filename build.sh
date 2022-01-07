#!/bin/bash
echo "Cleaning dist folder..."
rm -rf dist/**
echo "Done, now building latest version of MideaHumidifierCard"
npm run build
