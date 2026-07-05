<script>
  import '../app.css';
</script>

<div class="min-h-screen bg-slate-100 text-slate-900">
  <nav class="border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <a href="/" class="text-lg font-semibold text-sky-700">Student Portal</a>
      <div class="flex flex-wrap gap-3 text-sm font-medium text-slate-600">
        <a href="/" class="rounded-full px-3 py-2 hover:bg-slate-100 hover:text-sky-700">Home</a>
        <a href="/register" class="rounded-full px-3 py-2 hover:bg-slate-100 hover:text-sky-700">Student Registration</a>
        <a href="/search" class="rounded-full px-3 py-2 hover:bg-slate-100 hover:text-sky-700">Search Student</a>
        <a href="/students" class="rounded-full px-3 py-2 hover:bg-slate-100 hover:text-sky-700">View Students</a>
      </div>
    </div>
  </nav>
  <slot />
</div>
