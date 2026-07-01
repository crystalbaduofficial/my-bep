# Vercel Deployment Checklist

## Pre-Deployment

### Code Quality
- ✅ Lint passes: `npm run lint`
- ✅ TypeScript checks pass: `npm run typecheck`
- ✅ Build succeeds: `npm run build`
- ✅ No console errors or warnings
- ✅ No TypeScript errors

### Content Verification
- ✅ No fake data (stats, testimonials, pricing, dashboards)
- ✅ No "coming soon" placeholders
- ✅ All CTAs are real links
- ✅ No broken image references
- ✅ All routes are functional

### Link Verification
- ✅ SSO links point to `sso.backflowexamprep.com`
- ✅ Store links point to `shop.backflowexamprep.com`
- ✅ Help links point to `help.backflowexamprep.com`
- ✅ Documentation links point to `docs.backflowexamprep.com`
- ✅ Status page links point to `status.backflowexamprep.com`
- ✅ All internal routes work correctly
- ✅ No placeholder or demo links

### Mobile Responsiveness
- ✅ Homepage responsive on mobile
- ✅ All landing pages responsive
- ✅ Navbar hamburger menu functional
- ✅ Footer columns responsive
- ✅ Forms and CTAs touch-friendly
- ✅ No horizontal scroll on mobile

### Performance
- ✅ Images optimized
- ✅ No render-blocking resources
- ✅ Animations respect `prefers-reduced-motion`
- ✅ Canvas background optimized
- ✅ No console warnings

### Design & UX
- ✅ Dark theme consistent
- ✅ Blue accent color applied
- ✅ Spacing and typography consistent
- ✅ Hover states functional
- ✅ Loading states appropriate
- ✅ Error handling appropriate

### Environment Variables
- ✅ `.env.local` configured correctly
- ✅ No secrets in code
- ✅ No API keys exposed

## Deployment Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "rebuild: Premium Vercel-style public site"
   git push origin main
   ```

2. **Verify Build**
   - Check GitHub actions/CI passes
   - Confirm TypeScript and lint checks pass

3. **Deploy to Vercel**
   - Automatic deployment on push to main
   - Or manual deploy via Vercel CLI: `vercel --prod`

4. **Post-Deployment**
   - Visit production URL
   - Test all major routes
   - Verify links work
   - Check mobile responsiveness
   - Monitor error logs

## Production Checks

### Homepage
- [ ] Hero section renders correctly
- [ ] CTAs point to correct URLs
- [ ] Product cards load
- [ ] How it works section displays
- [ ] Built for section displays
- [ ] Quiz link works

### Navigation
- [ ] Navbar displays correctly
- [ ] Desktop navigation links work
- [ ] Mobile hamburger menu works
- [ ] Help dropdown works (if on desktop)
- [ ] Sign In/Sign Up links work

### Footer
- [ ] All footer links functional
- [ ] All external links open in new tabs
- [ ] Copyright year is correct
- [ ] Responsive on mobile

### Landing Pages
- [ ] Learning Center loads
- [ ] Practice Exams loads
- [ ] Simulator loads
- [ ] Courses loads (redirects correctly)
- [ ] Organizations loads
- [ ] Enterprise loads
- [ ] Resources loads
- [ ] About loads
- [ ] Contact loads

### Legal Pages
- [ ] Terms of Service loads
- [ ] Privacy Policy loads
- [ ] Refund Policy loads

### Quiz
- [ ] Quiz loads
- [ ] All 5 questions display correctly
- [ ] Answers navigate correctly
- [ ] Results page displays
- [ ] CTA buttons work

## Performance Targets

- Lighthouse Performance: ≥ 90
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 90
- Lighthouse SEO: ≥ 90
- Core Web Vitals: All green

## Monitoring

### Error Tracking
- Set up Sentry or similar
- Monitor for JavaScript errors
- Track deployment issues

### Analytics
- Set up Google Analytics (if needed)
- Track page views
- Monitor user navigation

### Uptime Monitoring
- Set up uptime monitoring
- Alert on 404s or errors
- Monitor response times

## Rollback Procedure

If issues occur:

1. Verify the issue on production
2. Revert to previous commit: `git revert HEAD`
3. Push to trigger redeploy
4. Verify production is stable
5. Investigate root cause
6. Fix and redeploy

## Deployment Success Criteria

✅ All pages load without errors
✅ All links work correctly
✅ Mobile responsiveness verified
✅ No console errors
✅ Lighthouse scores ≥ 90
✅ All CTAs functional
✅ No broken links
✅ Load times acceptable
