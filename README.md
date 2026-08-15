<div align="center">
  <h1>randoport</h1>
  <p>Generate secure, random network ports instantly for development, testing, and production.</p>

  <p>
    <a href="https://randoport.onrender.com" target="_blank">
      <img src="https://img.shields.io/badge/Website-Live-00f2ff?style=for-the-badge" alt="Website Live" />
    </a>
    <a href="https://github.com/devparanjay/randoport/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-AGPL_3.0-00ff41?style=for-the-badge" alt="License AGPL 3.0" />
    </a>
  </p>
</div>

<br />

**randoport** is a fast, modern web tool designed to help developers, system administrators, and operators find safe, non-conflicting network ports for their applications and services.

## The Problem
When setting up new services, databases, or local development environments, choosing a random port often leads to conflicts with existing software or system services. Manually checking registry lists or relying on memory is inefficient.

## The Solution
**randoport** solves this by generating random ports that actively bypass known, reserved, and commonly used port numbers. It consults standards like the IANA Service Name and Transport Protocol Port Number Registry and avoids conventions (like PostgreSQL on 5432 or React servers on 3000) so you can bind with confidence.

---

## Features

- **Safe Generation**: Automatically excludes a comprehensive list of ports used by common applications, system utilities, and development services.
- **Flexible Ranges**: Choose between:
  - `Registered (1024 - 49151)`: Ideal for specific services needing consistent accessibility.
  - `Ephemeral (49152 - 65535)`: Best for short-lived, temporary connections.
- **Bulk Generation**: Specify exactly how many unique ports you need in one go.
- **One-Click Copy**: Easily copy individual ports or the entire generated list directly to your clipboard.

## Who is this for?
- **Developers** spinning up local backend services, microservices, or frontend dev servers.
- **Testers/QA** creating isolated testing environments that require unique port bindings.
- **DevOps/SysAdmins** configuring reverse proxies, Docker containers, or internal network services.

## Usage

You don't need to install anything! **randoport** is entirely web-based and runs in your browser.

1. Visit [randoport.onrender.com](https://randoport.onrender.com).
2. Select your desired **Port Range**.
3. Enter the **Number of Ports** you need.
4. Click **Find Ports**.
5. Click on any generated port to copy it, or use the **Copy all** button.
