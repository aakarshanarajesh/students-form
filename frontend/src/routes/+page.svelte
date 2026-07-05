<script>
</script>

<svelte:head>
  <title>Student Portal</title>
  <meta name="description" content="Register and manage student records with GraphQL and MongoDB Atlas." />
</svelte:head>

<div class="px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl space-y-8">
    <section class="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 to-indigo-700 p-8 text-white shadow-xl">
      <p class="text-sm uppercase tracking-[0.3em] text-sky-100">Modern Student Management</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">Register, search, and review students in one place.</h1>
      <p class="mt-4 max-w-2xl text-sm text-sky-100 sm:text-base">Use the navigation links to register new students, search by name, or review the full student roster.</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="/register" class="rounded-full bg-white px-4 py-2 font-semibold text-sky-700">Register Student</a>
        <a href="/students" class="rounded-full border border-white/40 px-4 py-2 font-semibold text-white">View Students</a>
      </div>
    </section>
  </div>
</div>
