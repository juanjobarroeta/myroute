// Authentication UI and Logic

// Show/Hide Auth Modal
function showAuthModal(mode = 'login') {
  document.getElementById('authModal').style.display = 'flex';
  document.getElementById('authMode').value = mode;
  updateAuthModal();
}

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
  clearAuthForm();
}

function updateAuthModal() {
  const mode = document.getElementById('authMode').value;
  const isLogin = mode === 'login';
  
  document.getElementById('authTitle').textContent = isLogin ? 'Login' : 'Sign Up';
  document.getElementById('nameField').style.display = isLogin ? 'none' : 'block';
  document.getElementById('authSubmitBtn').textContent = isLogin ? 'Login' : 'Sign Up';
  document.getElementById('authToggleText').innerHTML = isLogin
    ? "Don't have an account? <a href='#' onclick='toggleAuthMode(); return false;'>Sign Up</a>"
    : "Already have an account? <a href='#' onclick='toggleAuthMode(); return false;'>Login</a>";
}

function toggleAuthMode() {
  const currentMode = document.getElementById('authMode').value;
  document.getElementById('authMode').value = currentMode === 'login' ? 'register' : 'login';
  updateAuthModal();
  clearAuthForm();
}

function clearAuthForm() {
  document.getElementById('authName').value = '';
  document.getElementById('authEmail').value = '';
  document.getElementById('authPassword').value = '';
  document.getElementById('authError').textContent = '';
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  
  const mode = document.getElementById('authMode').value;
  const name = document.getElementById('authName').value;
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  const errorDiv = document.getElementById('authError');
  
  errorDiv.textContent = '';
  
  try {
    let result;
    if (mode === 'login') {
      result = await authAPI.login(email, password);
    } else {
      result = await authAPI.register(name, email, password);
    }
    
    // Success!
    hideAuthModal();
    updateUIForLoggedInUser(result.user);
    alert(`Welcome ${result.user.name}!`);
  } catch (error) {
    errorDiv.textContent = error.message || 'Authentication failed';
  }
}

function updateUIForLoggedInUser(user) {
  document.getElementById('authButtons').style.display = 'none';
  document.getElementById('userMenu').style.display = 'inline-block';
  document.getElementById('userName').textContent = user.name;
  document.getElementById('saveRouteBtn').style.display = 'inline-block';
  document.getElementById('savedRoutesBtn').style.display = 'inline-block';
}

function updateUIForLoggedOutUser() {
  document.getElementById('authButtons').style.display = 'inline-block';
  document.getElementById('userMenu').style.display = 'none';
  document.getElementById('saveRouteBtn').style.display = 'none';
  document.getElementById('savedRoutesBtn').style.display = 'none';
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    authAPI.logout();
    updateUIForLoggedOutUser();
  }
}

// Check auth status on page load
async function checkAuthStatus() {
  if (authAPI.isLoggedIn()) {
    try {
      const result = await authAPI.getCurrentUser();
      updateUIForLoggedInUser(result.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      authAPI.logout();
    }
  } else {
    updateUIForLoggedOutUser();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkAuthStatus);

