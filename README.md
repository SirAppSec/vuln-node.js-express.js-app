# A vulnerable Express.js + Node.js API and Frontend
### 

# Warning
This application is not intended for production. It was heavily influenced by real life code.

USE WITH CAUTION

## Quick Start with docker

1. Install Docker
2. Run `docker pull sirappsec/nodejs-vulnerable-app`
Run `docker run --rm -p 3000:3000 sirappsec/nodejs-vulnerable-app`
3. Browse to http://localhost:3000 (on macOS and Windows browse to http://192.168.99.100:3000 if you are using docker-machine instead of the native docker installation)

## Quick Start with npm
```bash
git clone https://github.com/SirAppSec/vuln-node.js-express.js-app.git
cd vuln-node.js-express.js-app
npm install
npm install nodemon
npm run dev

```
# Purpose
1. Test your skills, try to pentest and find the vulnerabilities
2. Use to Asses DAST/SAST tools for Node.js/Express.js applications
3. Learn how not to write code

# Advantages over NodeGoat
While NodeGoat cover mostly OWASP Top 10(inc SSRF and ReDos). This project have more vulnerabilities, multiple exploit chains and other weaknesses like low hanging fruits that are commonly found in production and enterprise level applications.

# Vulnerabilities/Weaknesses
* Sql injection
* Business Logic
* XXE - XML External Entity
* RCE - Remote Code Execution
* Session Fixation
* Improper Password Strength Controls
* Hard Coded Secrets
* Insufficient Randomness
* Path Traversal
* Privileged Interface Exposure
* Leftover Debug Code
* Authentication Credentials In URL
* Insecure OTP/2FA/MFA
* Vertical Privilege escalation
* Horizontal Privilege escalation
* Insecure Object Deserialization
* CSRF - Cross Site Request Forgery
* SSRF - Server Side Request Forgery
* Click Jacking / Lack of Security Headers
* Insecure Redirect
* Vulnerable and Outdated Components (Probably, lol)
* Forced Browsing
* Password Hash With Insufficient Computational Effort
* Excessive Data Exposure
* PII Leak - Personal Identifiable Information Exposure
* BOLA - Broken Object Level Authorization
* Broken User Authentication
* Mass Assignment
* User Enumeration
* Improper Asset management 
* Broken Function Level
* IDOR - Insecure Direct Object References
* DOS - Denial of Service
* ReDoS - Regular Expression Denial Of Service
* Insufficient Logging & Monitoring 
* Insecure JWT Implementation
* Uverified JWT manipulation
* JWT Secret Key Brute Force
* Template injection (SSTI)
* Reflected + Stored XSS - Cross Site Scripting

## Todo
* Insecure TLS Validation 
* Arbitrary file writes
* Type Confusion
* Prototype pollution
* Log injection
* Host header poisoning
* Encryption vulnerabilities
* Trust boundary violations
* Web Socket Security
* NoSQL Injection
* JSON Hijacking

# How to Start
`docker-compose up`
or nativaly
`npm run dev`

# Docs
The swagger docs clearly state the type of vulnerability/exploitation method
As expected, only some methods require authentication/authorization, mostly for the sake of brevity, although the most common (IMO) auth vulnerabilities are present in the application.
<img width="832" alt="image" src="https://user-images.githubusercontent.com/89794666/182978736-72471ed2-eaf6-41e2-8af4-9122ea21db4e.png">
<img width="1024" alt="image" src="https://user-images.githubusercontent.com/89794666/182978784-677e3f7c-ba57-4683-b7cd-523f68a7ec28.png">


Access the api from http://localhost:5000/api-docs

# Easter Eggs
Try to find deleted passwords and files in the repository.

You can also try to look for logic that breaks the application.


# License
This repository is free to use as is without any limitations

the lorem impsum theme is free from https://themewagon.com/themes/free-responsive-bootstrap-5-html5-admin-template-sneat/

# Refs
https://owasp.org/www-project-api-security/
https://www.shiftleft.io/blog/node.js-vulnerability-cheatsheet/
https://snyk.io/blog/remediate-javascript-type-confusion-bypassed-input-validation/
https://github.com/snoopysecurity/dvws-node/wiki
https://medium.com/@chaudharyaditya/insecure-deserialization-3035c6b5766e
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
https://hackernoon.com/secure-sessions-in-javascript-forking-express-session-to-improve-security-s62c35mk
https://github.com/expressjs/session/issues/158
https://javascript.plainenglish.io/create-otp-based-user-sign-up-using-node-js-cc4defc54123
https://jwt.io/
https://www.bezkoder.com/node-js-jwt-authentication-mysql/
https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
https://expressjs.com/en/4x/api.html
https://www.synack.com/blog/a-deep-dive-into-xxe-injection/
https://www.exploit-db.com/docs/english/41397-injecting-sqlite-database-based-applications.pdf
https://brikev.github.io/express-jsdoc-swagger-docs/#/README
https://app-sec.gitbook.io/application-security/node.js-+-express.js-security-best-practices

# Academic References
This repository has been referenced in the academic research paper:

Title: DeepCode AI Fix: Fixing Security Vulnerabilities with Large Language Models
Authors: Berabi, et al.
Published on: arXiv, February 2024
https://arxiv.org/pdf/2402.13291v1

The paper explores the use of Large Language Models to automatically detect and fix security vulnerabilities. Our project is cited as a case study in demonstrating real-world examples of vulnerable applications and their mitigations.
