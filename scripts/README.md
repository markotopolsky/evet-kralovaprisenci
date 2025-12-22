# Server Scripts

This folder contains utility scripts for server management and protection.

## Cloudflare DDoS Protection

**File:** `cloudflare-ddos-protection.sh`

This script monitors CPU usage and automatically enables Cloudflare's "I'm Under Attack" mode when CPU spikes occur, protecting your server from DDoS attacks.

Based on: [DevDojo - Bash Script to Automatically Enable Cloudflare DDoS Protection](https://devdojo.com/post/bobbyiliev/bash-script-to-automatically-enable-cloudflare-ddos-protection)

### Features

- ✅ Monitors server CPU load
- ✅ Automatically enables Cloudflare "I'm Under Attack" mode on high CPU
- ✅ Automatically disables protection when CPU normalizes
- ✅ Logs all actions to `/var/log/cloudflare-ddos-protection.log`

### Prerequisites

1. A Cloudflare account with your domain added
2. Cloudflare API Key (find in Dashboard > My Profile > API Tokens)
3. Cloudflare Zone ID (find in Dashboard > Overview, scroll down)
4. `curl` installed on your server

### Setup

#### 1. Copy the script to your server

```bash
scp scripts/cloudflare-ddos-protection.sh user@your-server:/home/user/
```

#### 2. Configure the script

Edit the script and update these values:

```bash
nano /home/user/cloudflare-ddos-protection.sh
```

Update:
```bash
CF_ZONE_ID="YOUR_CF_ZONE_ID"
CF_EMAIL_ADDRESS="YOUR_CF_EMAIL_ADDRESS"
CF_API_KEY="YOUR_CF_API_KEY"
CPU_THRESHOLD=80  # Adjust based on your server capacity
```

#### 3. Make the script executable

```bash
chmod +x /home/user/cloudflare-ddos-protection.sh
```

#### 4. Test the script

```bash
/home/user/cloudflare-ddos-protection.sh
```

Check the log:
```bash
cat /var/log/cloudflare-ddos-protection.log
```

#### 5. Set up cron jobs

Run the script every 30 seconds:

```bash
crontab -e
```

Add these lines:
```cron
* * * * * /home/user/cloudflare-ddos-protection.sh
* * * * * ( sleep 30 ; /home/user/cloudflare-ddos-protection.sh )
```

### How to Get Cloudflare Credentials

1. **Zone ID:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Select your website
   - Scroll down on the Overview page
   - Copy the "Zone ID" from the right sidebar

2. **API Key:**
   - Go to My Profile > API Tokens
   - Under "API Keys", click "View" next to "Global API Key"
   - Copy the key

3. **Email Address:**
   - Use the email you registered with Cloudflare

### Security Notes

⚠️ **Important:** Keep your API key secure! Never commit it to version control.

Consider using environment variables:
```bash
export CF_ZONE_ID="your-zone-id"
export CF_EMAIL_ADDRESS="your-email"
export CF_API_KEY="your-api-key"
```

Then update the script to read from environment:
```bash
CF_ZONE_ID="${CF_ZONE_ID}"
CF_EMAIL_ADDRESS="${CF_EMAIL_ADDRESS}"
CF_API_KEY="${CF_API_KEY}"
```

### Troubleshooting

- **Script not triggering:** Check if cron is running: `systemctl status cron`
- **API errors:** Verify your Zone ID and API key are correct
- **Permission denied:** Make sure the script is executable and log directory is writable




