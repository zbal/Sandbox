#!/bin/bash

date=$(date)

cat > _site/index.html << EOF

$date

EOF
