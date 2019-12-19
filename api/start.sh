#!/usr/bin/env bash

nohup node index.js 1>>./logs/info.log 2>>./logs/error.log &
