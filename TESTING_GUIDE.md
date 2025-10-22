# 🧪 Testing Phase 1 Setup

## ✅ Manual Testing Checklist

### 1. **Start Server**
```bash
npm run dev
```
Server should start at http://localhost:3000

---

### 2. **Test Login Page**

**Navigate to**: http://localhost:3000/auth/sign-in

✅ **Check:**
- [ ] Page loads without errors
- [ ] Login form displays
- [ ] Username/password fields work
- [ ] Password toggle (show/hide) works
- [ ] "Washify Admin" title shows
- [ ] "Admin, Manager & Staff Portal" subtitle shows

---

### 3. **Test Authentication**

**Before you test login, make sure:**
1. Backend is running at `http://localhost:8080`
2. You have valid credentials

**Try to login with:**
- Username: `admin@washify.com` (or your admin account)
- Password: `your_password`

✅ **Expected:**
- [ ] Loading spinner shows during login
- [ ] On success: Redirect to dashboard `/`
- [ ] On error: Error message displays

---

### 4. **Test Protected Routes**

**After successful login:**

✅ **Check Dashboard:**
- [ ] Sidebar shows Washify menu structure
- [ ] User info dropdown shows in header
- [ ] User name displays
- [ ] User role badge shows (ADMIN/MANAGER/STAFF)
- [ ] Can navigate between pages

✅ **Test User Info Dropdown:**
- [ ] Click user avatar/name
- [ ] Dropdown opens
- [ ] Shows user name, email, and role badge
- [ ] "View profile" link works
- [ ] "Account Settings" link works
- [ ] "Log out" button works

---

### 5. **Test Logout**

**Click "Log out" in user dropdown**

✅ **Expected:**
- [ ] Redirects to `/auth/sign-in`
- [ ] Token cleared from localStorage
- [ ] Cannot access protected routes anymore

---

### 6. **Test Unauthorized Access**

**Method 1: Try accessing without login**
1. Clear localStorage (Dev Tools → Application → Local Storage)
2. Try to access http://localhost:3000/

✅ **Expected:**
- [ ] Automatically redirects to `/auth/sign-in`

**Method 2: Try logging in with customer account**
1. Login with a CUSTOMER role account
2. Should see error: "Access denied. Admin/Manager/Staff only."

✅ **Expected:**
- [ ] Login fails
- [ ] Error message displays
- [ ] Stays on login page

---

### 7. **Test API Connection**

**Open Browser DevTools → Network tab**

✅ **Check API calls:**
- [ ] Login: `POST http://localhost:8080/api/auth/login`
- [ ] Response includes `token` and `user` object
- [ ] Subsequent requests have `Authorization: Bearer {token}` header

---

### 8. **Test Error Handling**

**Test 1: Wrong credentials**
- Enter wrong username/password
- ✅ Error message displays

**Test 2: Network error**
- Stop backend server
- Try to login
- ✅ Network error message shows

**Test 3: Invalid token**
- Manually edit token in localStorage to invalid value
- Refresh page
- ✅ Redirects to login

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution:**
- Check if backend is running at `http://localhost:8080`
- Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`

### Issue: "CORS error"
**Solution:**
- Backend needs to allow CORS from `http://localhost:3000`
- Check Spring Boot CORS configuration

### Issue: "401 Unauthorized on protected routes"
**Solution:**
- Check token is saved in localStorage
- Check token is valid
- Check axios interceptor is adding Authorization header

### Issue: "Module not found" errors
**Solution:**
```bash
npm install
# Clear .next cache
rm -rf .next
npm run dev
```

---

## ✅ All Tests Passed?

If all tests pass, you're ready for **Phase 2**! 🚀

**Next steps:**
1. Confirm Phase 1 is working
2. Start implementing Dashboard Overview page
3. Add statistics cards
4. Add charts and tables

Let me know when ready to continue!
