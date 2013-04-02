#!/bin/bash
############################
# Send mysqldumpslow report to a list of email address
############################
# Objective:
#  to be run weekly and concatenate the slow mysql logs
#   then run several type of reports based on mysqldumpslow perl script
############################
# Contact: vincent.viallet@gmail.com
############################

## Common
DATE=$(date "+%Y%m%d")
FREQ=1 # days

## Use to mutt to send emails (easier to add attachements)
MAIL=/usr/bin/mutt

## Comma separated list of email recipients
EMAIL=''
EMAIL_CC_LIST=''

## Slow log location
SLOW_LOG_DIR=/var/log/mysql/

## Couple of tests to validate the conditions
if [ ! -x $MAIL ]; then
  echo " $MAIL is not executable, or is not installed. Aborting."
  exit 1
fi

## Slow log archive format (we don't want the new)
SLOW_LOG_FORMAT='mysqld-slow.log-*'

## Last logs
LOG_FILES=$(find $SLOW_LOG_DIR -name "$SLOW_LOG_FORMAT" -ctime -$FREQ)

## Build mysqldumpslow reports
TMP_DIR=$(mktemp -d)

mkdir $TMP_DIR/gzip
cp $LOG_FILES $TMP_DIR/gzip
for file in $TMP_DIR/gzip/*
do
  gunzip $file
done


mysqldumpslow -s c -t 100 $TMP_DIR/gzip/* | gzip -c > $TMP_DIR/$DATE.$(hostname).slow-report.count.txt.gz
mysqldumpslow -s at -t 100 $TMP_DIR/gzip/* | gzip -c > $TMP_DIR/$DATE.$(hostname).slow-report.time.txt.gz
mysqldumpslow -s al -t 100 $TMP_DIR/gzip/* | gzip -c > $TMP_DIR/$DATE.$(hostname).slow-report.lock.txt.gz

## Send email
echo "Attached is the mysqldumpslow reports for the last $FREQ days." | $MAIL $EMAIL \
    -s "$HOSTNAME - $FREQ days slow log report - $DATE "       \
    -c $EMAIL_CC_LIST                                          \
    -a $TMP_DIR/$DATE.$(hostname).slow-report.count.txt.gz         \
    -a $TMP_DIR/$DATE.$(hostname).slow-report.time.txt.gz          \
    -a $TMP_DIR/$DATE.$(hostname).slow-report.lock.txt.gz      

rm -rf $TMP_DIR
