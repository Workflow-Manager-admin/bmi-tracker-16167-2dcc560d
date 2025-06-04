#!/bin/bash
cd /home/kavia/workspace/code-generation/bmi-tracker-16167-2dcc560d/bmi_tracker
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

