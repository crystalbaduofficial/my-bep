# Email Template Handoff

## Overview

This document outlines the email templates needed for the Backflow Exam Prep public site and learning platform. These emails are referenced during user signup, quiz results, and various platform interactions.

**Important:** Email templates should be maintained in a shared email service package, not duplicated across multiple applications.

## Email Template Style Guide

### Design Principles
- **Background:** Pure black (#000000)
- **Text:** White (Open Sans or system sans-serif)
- **Accent Color:** Electric blue (#3B82F6)
- **Secondary Elements:** Gray (#6B7280)
- **Typography:** Clean, minimal, spacious
- **Responsive:** Mobile-first design
- **Branding:** Logo and favicon consistent

### Layout Standards
```
- Header: Logo + Backflow Exam Prep branding
- Hero: Headline + subheadline + visual element
- Content: Main message with clear hierarchy
- CTA: Primary button (blue) + optional secondary link
- Footer: Copyright, links, unsubscribe
- Preheader: Brief summary line (50 chars)
```

### Button Styles
- **Primary Button:** Blue background (#3B82F6), white text, rounded corners
- **Secondary Button:** White border, transparent background, white text

### Color Palette for Emails
| Element | Color | Hex |
|---------|-------|-----|
| Background | Black | #000000 |
| Text | White | #FFFFFF |
| Primary | Blue | #3B82F6 |
| Secondary | Gray | #6B7280 |
| Accent | Cyan | #38BDF8 |
| Success | Green | #10B981 |
| Alert | Red | #EF4444 |

## Email Templates Needed

### 1. Welcome Email
**Sent:** Upon account creation
**Purpose:** Welcome user and guide to next steps

**Content:**
- Welcome headline
- "Your account is ready"
- Quick start guide (3 steps)
- Primary CTA: "Start Learning"
- Link to Help Center

**Template Variables:**
- `{{ user.firstName }}`
- `{{ platform.name }}`
- `{{ signup.date }}`

### 2. Quiz Results Email
**Sent:** After user completes "Find Your Path" quiz
**Purpose:** Personalized learning path recommendation

**Content:**
- Quiz results headline
- Recommended path (title + icon)
- Timeline and next steps
- Recommended tools
- Primary CTA: "Start [Path Name]"
- Secondary CTA: "Explore All Options"

**Template Variables:**
- `{{ user.firstName }}`
- `{{ quiz.path.title }}`
- `{{ quiz.path.timeline }}`
- `{{ quiz.path.nextSteps }}`
- `{{ quiz.path.tools }}`

### 3. Trial Started Email
**Sent:** When free trial begins
**Purpose:** Confirm trial and explain access

**Content:**
- "Your 7-day trial has started"
- What's included
- 3 key features highlighted
- Timeline reminder (7 days)
- Primary CTA: "Start Learning"
- Secondary CTA: "View Plans"

**Template Variables:**
- `{{ user.firstName }}`
- `{{ trial.startDate }}`
- `{{ trial.endDate }}`
- `{{ trial.daysRemaining }}`

### 4. Trial Expiring Soon Email
**Sent:** 3 days before trial ends
**Purpose:** Encourage upgrade

**Content:**
- "Your trial expires in 3 days"
- Value proposition
- Plan options
- Primary CTA: "Choose a Plan"
- Secondary CTA: "Get Help"

**Template Variables:**
- `{{ user.firstName }}`
- `{{ trial.expiryDate }}`
- `{{ plans }}`

### 5. Subscription Confirmation Email
**Sent:** Upon successful subscription
**Purpose:** Confirm purchase and provide access

**Content:**
- "Welcome to [Plan]"
- Subscription details
- What's included
- Getting started guide
- Primary CTA: "Access Dashboard"
- Help resources

**Template Variables:**
- `{{ user.firstName }}`
- `{{ subscription.plan }}`
- `{{ subscription.startDate }}`
- `{{ subscription.amount }}`
- `{{ subscription.renewalDate }}`

### 6. Payment Failed Email
**Sent:** When subscription payment fails
**Purpose:** Alert user and provide resolution

**Content:**
- "Payment Failed"
- What happened
- Action required
- How to update payment
- Primary CTA: "Update Payment Method"
- Support link

**Template Variables:**
- `{{ user.firstName }}`
- `{{ payment.error }}`
- `{{ payment.retryDate }}`

### 7. Password Reset Email
**Sent:** When user requests password reset
**Purpose:** Provide reset link

**Content:**
- Password reset request
- Reset link (valid for 24 hours)
- Security notice
- Support contact

**Template Variables:**
- `{{ user.firstName }}`
- `{{ resetLink }}`
- `{{ expiryTime }}`

### 8. Cancellation Confirmation Email
**Sent:** When subscription is canceled
**Purpose:** Confirm cancellation and offer alternatives

**Content:**
- Cancellation confirmed
- Access details (when access ends)
- Offer to reactivate
- Feedback request
- Primary CTA: "Reactivate Subscription"
- Secondary CTA: "Tell us why"

**Template Variables:**
- `{{ user.firstName }}`
- `{{ cancellation.date }}`
- `{{ accessEndDate }}`

## Implementation Guidelines

### Service Provider
- **Recommended:** SendGrid, Mailgun, or AWS SES
- **Email Management:** Shared email package (not in `my-bep`)
- **Testing:** Smoke test in staging before production

### Smoke Testing Checklist
- [ ] Email renders in Litmus/Email on Acid
- [ ] All template variables substitute correctly
- [ ] Links are clickable and go to correct URLs
- [ ] Responsive on mobile (tested at 320px)
- [ ] Dark mode compatible
- [ ] Images load correctly
- [ ] No broken CSS or misaligned elements
- [ ] Unsubscribe link present and functional
- [ ] Reply-to address configured
- [ ] Sender name and email correct

### Do NOT Include
- ❌ Placeholder links
- ❌ Demo content
- ❌ Fake data
- ❌ "Coming soon" sections
- ❌ Lorem ipsum text

## Next Steps

1. **Create Shared Email Package**
   - Repository: `bep-email-templates`
   - Contains all templates above
   - Manages both text and HTML versions

2. **Integrate with Services**
   - Wire up templates in SSO/Auth service
   - Wire up quiz results in `my-bep`
   - Wire up subscription notifications in Store

3. **Testing & QA**
   - Smoke test each template
   - Test across email clients
   - Verify all variables work
   - Test on mobile

4. **Documentation**
   - Document template variables
   - Create email testing guide
   - Document deployment process

## Questions?

For questions about email implementation, reach out to the team lead or review this handoff with the email service owner.
