# Public Site Handoffs & Integration Points

**Status**: Ready for Backend Integration  
**Last Updated**: 2026-07-01

---

## Overview

This document describes how `my.backflowexamprep.com` (my-bep) hands off users to other Backflow Exam Prep services:
- **SSO** (sso.backflowexamprep.com) - Authentication
- **LMS** (lms.backflowexamprep.com) - Learning Center  
- **Shop** (shop.backflowexamprep.com) - Store & Licensing
- **Support** (help/docs/status sites) - Help & Docs

---

## SSO Handoffs

### 1. Sign In / Sign Up

**URLs:**
- Sign In: `https://sso.backflowexamprep.com/sign-in`
- Sign Up: `https://sso.backflowexamprep.com/sign-up`

**Locations on my-bep:**
- Navbar (top right) - Both links
- Onboarding Step 1 (CTA)
- Final CTA section (homepage)
- Quiz results (Create Account button)

**Parameters:**
- Optional `intent` query param for onboarding context
  - Example: `?intent=learning-plan` or `?intent=exam-sprint`
  - Use case: Pre-populate recommended plan after auth

**Expected Return:**
- After SSO, user should land on `lms.backflowexamprep.com` or account center
- Session token should allow seamless LMS access

---

### 2. Enterprise Contact Form

**URL:**  
`https://sso.backflowexamprep.com/contact`

**Locations:**
- Enterprise page: "Schedule Demo" button
- Organizations page: "Start Free Trial" button

**Parameters:**
- Optional `source=my-bep` to track source

**Expected Flow:**
- User fills contact form
- Sales team routes to appropriate channel

---

## LMS Handoffs

### 1. Learning Center Entry Points

**Primary URL:**  
`https://lms.backflowexamprep.com`

**Locations:**
- Navbar: "Training" link
- Homepage: Product feature cards
- GlobeHero (Step 1 of onboarding): "Explore Learning" button
- Final CTA: "Start Learning" button
- Quiz results: "Start Learning" button

**Parameters:**
- `?plan=ready` - Indicates user has completed quiz
- `?source=my-bep-plan` - Track quiz-sourced traffic

---

### 2. Practice Exams

**URL:**  
`https://lms.backflowexamprep.com/practice`

**Locations:**
- Navbar: "Practice Exams" link
- Homepage: Product overview card
- Homepage: Practice exams section (3 cards)

---

### 3. Simulator

**URL:**  
`https://lms.backflowexamprep.com/simulator`

**Locations:**
- Navbar: "Simulator" link
- Homepage: Product overview card
- Homepage: Simulator section preview

---

### 4. Courses

**URL:**  
`https://lms.backflowexamprep.com/courses`

**Locations:**
- Navbar: "Courses" link
- Homepage: Product overview card

---

### 5. Certificates

**URL:**  
`https://lms.backflowexamprep.com/certificates`

**Locations:**
- Footer: "Certificates" link

---

### 6. Dashboard / Plan Continuation

**URL:**  
`https://lms.backflowexamprep.com/dashboard?plan=ready`

**Use Case:**
- After user creates account via SSO, redirect here with `plan=ready`
- LMS should recognize plan parameter and show recommended starting point

**Expected Behavior:**
- If user saved quiz result before login, it should populate here
- LMS shows: "Your personalized [Plan Name] is ready"
- Immediate CTA to "Start Lesson 1"

---

## Shop / Store Handoffs

### 1. Pricing & Plans

**URL:**  
`https://shop.backflowexamprep.com/pricing`

**Parameters:**
- `?source=my-bep-plan` - Track quiz-sourced conversions
- `?source=my-bep-homepage` - Track homepage conversions
- `?source=my-bep-enterprise` - Track enterprise page traffic

**Locations:**
- Navbar: "Pricing" link
- Pricing page: All CTAs
- Quiz results (for users choosing path with license requirements): "View Plans" button
- Enterprise page: Implied (custom pricing discussion)

**Expected Flow:**
- User views pricing and plans
- Chooses appropriate license tier
- Converts to customer

---

### 2. Billing Support

**URL:**  
`https://shop.backflowexamprep.com/support`

**Locations:**
- Footer: "Billing Support" link

---

## Support Handoffs

### 1. Help Center

**URL:**  
`https://help.backflowexamprep.com`

**Locations:**
- Navbar: Help dropdown, "Help Center" link
- Footer: "Help Center" link

---

### 2. Documentation

**URL:**  
`https://docs.backflowexamprep.com`

**Locations:**
- Navbar: Help dropdown, "Documentation" link
- Footer: "Documentation" link

---

### 3. System Status

**URL:**  
`https://status.backflowexamprep.com`

**Locations:**
- Navbar: Help dropdown, "System Status" link
- Footer: "System Status" link
- Status dot in navbar (shows "Operational")

---

### 4. Report Issue

**URL:**  
`https://report.backflowexamprep.com`

**Locations:**
- Navbar: Help dropdown, "Report a Problem" link
- Footer: "Report a Problem" link

---

## Quiz / Plan Builder Integration

### Current State: Client-Side Only ✅

**Component:**  
`components/PlanBuilder.tsx`

**Behavior:**
- 5-question quiz
- Generates one of 5 personalized lesson plans
- Results include:
  - Plan title (e.g., "7-Day Exam Sprint")
  - Duration estimate
  - 3 next steps
  - 3 CTAs with query parameters

**Quiz Questions:**
1. When is your test?
2. What are you preparing for?
3. Confidence level?
4. Study preference?
5. Training context (alone or team)?

**Example Results:**

```json
{
  "title": "7-Day Exam Sprint",
  "duration": "7 days",
  "description": "Intensive daily sessions...",
  "nextSteps": [...],
  "learningCTAUrl": "https://lms.backflowexamprep.com?plan=exam-sprint",
  "storeCTAUrl": "https://shop.backflowexamprep.com/pricing?source=my-bep-plan",
  "createAccountUrl": "https://sso.backflowexamprep.com/sign-up?intent=exam-sprint"
}
```

---

## Backend Integration Roadmap

### Phase 1: Quiz Result Persistence (Optional but Recommended)

**Endpoint Needed:**  
`POST /api/quiz-results` on my-bep or SSO

**Payload:**
```json
{
  "sessionId": "...",
  "answers": {
    "timeline": "this-week",
    "purpose": "cert-exam",
    "confidence": "need-practice",
    "studyStyle": "exams",
    "context": "alone"
  },
  "generatedPlan": {
    "title": "7-Day Exam Sprint",
    "duration": "7 days"
  }
}
```

**Use Case:**
- Save quiz result before user signs up
- After SSO login, restore quiz result in LMS
- Pre-populate recommended plan

**Current Behavior (no backend):**
- Result stored only in browser session
- Lost if user navigates away
- Cannot restore after login

---

### Phase 2: Email Plan Delivery (Optional)

**Endpoint Needed:**  
`POST /api/send-plan-email` on my-bep or mail service

**Payload:**
```json
{
  "email": "user@example.com",
  "planName": "7-Day Exam Sprint",
  "planDuration": "7 days",
  "planUrl": "https://lms.backflowexamprep.com?plan=exam-sprint",
  "source": "my-bep-quiz"
}
```

**Email Template:**

**Subject:**  
`Your Backflow Exam Prep study plan is ready`

**Body:**
```
Hi [First Name],

Your personalized study plan is ready:

📚 7-Day Exam Sprint
⏱️ 7 days to prepare

Top 3 next steps:
1. Start with a quick diagnostic quiz
2. Do 2–3 timed practice exams daily  
3. Review explanations after each test

Your plan will be waiting in your Learning Center after you create your account.

[Button: Create Account]
[Button: View Plans]
[Button: Continue in Learning Center]

Questions? Visit help.backflowexamprep.com

Everything has a beginning. Seize yours.
— Backflow Exam Prep
```

**Constraints:**
- Do NOT send without explicit opt-in
- Do NOT fake email delivery
- Document if service is unavailable

---

### Phase 3: Analytics & Tracking

**Events to Track:**
- `quiz_started` - User begins "Find Your Path" quiz
- `quiz_completed` - User finishes quiz and views results
- `quiz_cta_clicked` - User clicks CTA from quiz results
- `homepage_cta_clicked` - Track which CTAs drive traffic

**Parameters to Pass:**
- `source=my-bep` or `source=my-bep-quiz`
- `plan_type=exam-sprint` (etc.)
- `timestamp`

---

## Current Limitations & Notes

### ⚠️ Not Implemented (Honest UX)

- ❌ Quiz result persistence to backend
- ❌ Email delivery of plan
- ❌ Account pre-filling with quiz data
- ❌ Post-login plan recommendation

### ✅ Works Out of Box

- ✅ All redirect URLs functional
- ✅ Quiz generates proper plan payloads
- ✅ Query parameters ready for tracking
- ✅ Mobile responsive throughout
- ✅ All ecosystem URLs correct

---

## Testing Checklist

### Happy Path: New User to LMS
- [ ] User lands on my.backflowexamprep.com
- [ ] User clicks "Create Account"
- [ ] Redirects to `sso.backflowexamprep.com/sign-up`
- [ ] After signup, user lands in LMS
- [ ] LMS shows "Welcome!" or dashboard

### Quiz Path: New User via Quiz
- [ ] User on homepage
- [ ] Completes "Find Your Path" quiz
- [ ] Clicks "Create Account" from results
- [ ] Redirected to SSO with `intent=exam-sprint`
- [ ] After signup, user is in LMS
- [ ] LMS recognizes `intent` parameter and shows plan

### Returning User: Sign In
- [ ] User clicks "Sign In"
- [ ] Redirects to `sso.backflowexamprep.com/sign-in`
- [ ] After signin, user lands in LMS

### Enterprise Contact
- [ ] User on enterprise page
- [ ] Clicks "Contact Sales"
- [ ] Redirects to SSO contact form or email
- [ ] Sales team receives inquiry

### Store Path: License Purchase
- [ ] User on quiz results sees "View Plans"
- [ ] Redirects to `shop.backflowexamprep.com/pricing`
- [ ] User selects plan and checks out
- [ ] Order confirmation shows license

---

## Integration Priority

**Must Have:**
- ✅ All ecosystem URLs working
- ✅ SSO sign-in/sign-up functional
- ✅ LMS accessible after auth
- ✅ Store pricing page accessible

**Should Have:**
- Quiz result persistence (medium effort)
- Plan recommendation in LMS (low effort)
- Email delivery (medium effort)

**Nice to Have:**
- Advanced analytics
- Plan customization UI
- Saved plans for logged-in users

---

## Support

For questions about handoffs or integration:
- Email: engineering@backflowexamprep.com
- Docs: https://docs.backflowexamprep.com
- Status: https://status.backflowexamprep.com
- Report: https://report.backflowexamprep.com

---

**Last Updated**: 2026-07-01  
**Maintained By**: My-BEP Team  
**Status**: Production Ready
