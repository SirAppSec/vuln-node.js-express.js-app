A vulnerable Express.js + Node.js + sequelise + JWT API

# Warning
This application is not intended for production. It was heavily influenced by real life code.

USE WITH CAUTION

# Purpose
1. Test your skills, try to pentest and find the vulnerabilities
2. Use to Asses DAST/SAST tools for Node.js/Express.js applications
3. Learn how not to write code

# Advantage over NodeGoat
While NodeGoat cover mostly OWASP Top 10. This project have multiple chains and other vulnerabilities like low hanging fruits that are commonly found in production and enterprise level applications
.
# Vulnerabilities
* Sql injection
* Business Logic
* XXE - XML External Entity
* RCE - Remote Code Execution
* Session Fixation
* Insufficient Randomness
* XSS (Reflected + Stored + DOM) (WIP)
* Path Traversal
* Privileged Interface Exposure
* Leftover Debug Code
* Authentication Credentials In URL
* Insecure OTP/2FA/MFA
* Vertical Privilege escalation
* Horizontal Privilege escalation
* Insecure Object Deserialization
* CSRF - Cross Site Request Forgery
* SSRF - Server Side Request Forgery)
* Click Jacking / Lack of Security Headers
* Insecure redirect
* Insecure TLS Validation (Removed)
* Vulnerable and Outdated Components
* Forced Browsing
* Excessive data exposure
* PII Leak - Personal Identifiable Information Exposure
* BOLA - Broken Object Level Authorization
* Broken user Authentication
* Mass Assignment
* User Enumeration
* Improper Asset management 
* Broken Function Level
* ReDoS - Regular Expression Denial Of Service (WIP)
* Insufficient Logging & Monitoring https://snyk.io/blog/remediate-javascript-type-confusion-bypassed-input-validation/

## Todo
* Type Confusion

# How to Install
`docker-compose up`
or nativaly
`npm run dev`

# Docs
The docs clearly state the type of vulnerability/exploitation method
As expected, only some methods require authentication/authorization, mostly for the sake of brevity, although the most common (IMO) auth vulnerabilities are present in the application.

Access the api from http://localhost:5000/api-docs

# Ref
https://owasp.org/www-project-api-security/

https://app-sec.gitbook.io/application-security/node.js-+-express.js-security-best-practices
