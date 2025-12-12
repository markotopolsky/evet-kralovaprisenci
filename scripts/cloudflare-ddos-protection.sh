#!/bin/bash

#######################################################
# Cloudflare DDoS Protection Script
# 
# This script monitors CPU usage and automatically
# enables Cloudflare's "I'm Under Attack" mode when
# CPU spikes occur, protecting your server from DDoS.
#
# Based on: https://devdojo.com/post/bobbyiliev/bash-script-to-automatically-enable-cloudflare-ddos-protection
# Source: https://github.com/bobbyiliev/cloudflare-ddos-protection
#######################################################

# ============================================
# CONFIGURATION - UPDATE THESE VALUES
# ============================================

# Your Cloudflare Zone ID (find in Cloudflare Dashboard > Overview)
CF_ZONE_ID="YOUR_CF_ZONE_ID"

# Your Cloudflare account email
CF_EMAIL_ADDRESS="YOUR_CF_EMAIL_ADDRESS"

# Your Cloudflare API Key (find in Cloudflare Dashboard > My Profile > API Tokens)
CF_API_KEY="YOUR_CF_API_KEY"

# CPU threshold percentage to trigger protection (adjust based on your server)
CPU_THRESHOLD=80

# Log file location
LOG_FILE="/var/log/cloudflare-ddos-protection.log"

# ============================================
# DO NOT EDIT BELOW THIS LINE
# ============================================

# Get the number of CPU cores
CPU_CORES=$(nproc)

# Get current CPU load (1 minute average)
CPU_LOAD=$(cat /proc/loadavg | awk '{print $1}')

# Calculate CPU usage percentage
CPU_USAGE=$(echo "$CPU_LOAD $CPU_CORES" | awk '{printf "%.0f", ($1/$2)*100}')

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Function to log messages
log_message() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

# Function to get current security level
get_security_level() {
    curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/settings/security_level" \
        -H "X-Auth-Email: $CF_EMAIL_ADDRESS" \
        -H "X-Auth-Key: $CF_API_KEY" \
        -H "Content-Type: application/json" | grep -o '"value":"[^"]*"' | cut -d'"' -f4
}

# Function to enable "I'm Under Attack" mode
enable_attack_mode() {
    RESPONSE=$(curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/settings/security_level" \
        -H "X-Auth-Email: $CF_EMAIL_ADDRESS" \
        -H "X-Auth-Key: $CF_API_KEY" \
        -H "Content-Type: application/json" \
        --data '{"value":"under_attack"}')
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        log_message "SUCCESS: Enabled 'I'm Under Attack' mode. CPU: ${CPU_USAGE}%"
        return 0
    else
        log_message "ERROR: Failed to enable attack mode. Response: $RESPONSE"
        return 1
    fi
}

# Function to disable "I'm Under Attack" mode (set to medium)
disable_attack_mode() {
    RESPONSE=$(curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/settings/security_level" \
        -H "X-Auth-Email: $CF_EMAIL_ADDRESS" \
        -H "X-Auth-Key: $CF_API_KEY" \
        -H "Content-Type: application/json" \
        --data '{"value":"medium"}')
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        log_message "SUCCESS: Disabled 'I'm Under Attack' mode. CPU: ${CPU_USAGE}%"
        return 0
    else
        log_message "ERROR: Failed to disable attack mode. Response: $RESPONSE"
        return 1
    fi
}

# Main logic
CURRENT_LEVEL=$(get_security_level)

if [ "$CPU_USAGE" -ge "$CPU_THRESHOLD" ]; then
    # CPU is high - enable protection if not already enabled
    if [ "$CURRENT_LEVEL" != "under_attack" ]; then
        log_message "ALERT: High CPU detected (${CPU_USAGE}%). Enabling DDoS protection..."
        enable_attack_mode
    fi
else
    # CPU is normal - disable protection if it was enabled
    if [ "$CURRENT_LEVEL" == "under_attack" ]; then
        log_message "INFO: CPU normalized (${CPU_USAGE}%). Disabling DDoS protection..."
        disable_attack_mode
    fi
fi

exit 0
