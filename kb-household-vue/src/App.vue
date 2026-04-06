<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="container topbar-inner">
        <router-link to="/" class="brand">
          <span class="brand-badge">KB</span>
          <div>
            <strong>국민은행 가계부 서비스</strong>
            <p>소비를 한눈에, 자산을 똑똑하게</p>
          </div>
        </router-link>

        <nav class="gnb">
          <router-link to="/">홈</router-link>
          <router-link to="/ledger">가계부</router-link>
          <router-link to="/login">로그인</router-link>
          <router-link to="/signup" class="signup-link">회원가입</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>
