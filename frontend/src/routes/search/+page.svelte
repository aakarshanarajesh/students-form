<script>
  import StudentTable from '../../components/StudentTable.svelte';
  import { SEARCH_STUDENTS_QUERY } from '../../graphql/queries.js';
  import { sendGraphQL } from '$lib/graphql.js';

  let searchTerm = '';
  let results = [];
  let isSearching = false;
  let message = '';

  async function handleSearch() {
    if (!searchTerm.trim()) {
      message = 'Please enter a student name.';
      results = [];
      return;
    }

    isSearching = true;
    message = '';

    try {
      const data = await sendGraphQL(SEARCH_STUDENTS_QUERY, { name: searchTerm.trim() });
      results = data.searchStudents || [];
      if (results.length === 0) {
        message = 'No records found.';
      }
    } catch (error) {
      message = error.message;
      results = [];
    } finally {
      isSearching = false;
    }
  }
</script>

<svelte:head>
  <title>Search Students</title>
</svelte:head>

<div class="px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-6xl space-y-8">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-800">Search Student</h1>
      <p class="mt-2 text-sm text-slate-500">Find students by their full name using the GraphQL search query.</p>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <input bind:value={searchTerm} class="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" placeholder="Enter full name" />
        <button on:click={handleSearch} disabled={isSearching} class="rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300">
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {#if message}
        <div class="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">{message}</div>
      {/if}
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-800">Search Results</h2>
      <div class="mt-4">
        <StudentTable students={results} />
      </div>
    </section>
  </div>
</div>
