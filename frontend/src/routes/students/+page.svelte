<script>
  import { onMount } from 'svelte';
  import StudentTable from '../../components/StudentTable.svelte';
  import { GET_STUDENTS_QUERY } from '../../graphql/queries.js';
  import { sendGraphQL } from '$lib/graphql.js';

  let students = [];
  let loading = true;
  let errorMessage = '';

  async function loadStudents() {
    loading = true;
    errorMessage = '';
    try {
      const data = await sendGraphQL(GET_STUDENTS_QUERY);
      students = data.getStudents || [];
    } catch (error) {
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadStudents();
  });
</script>

<svelte:head>
  <title>View Students</title>
</svelte:head>

<div class="px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl space-y-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {#if errorMessage}
        <div class="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>
      {/if}
      {#if loading}
        <div class="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading students...</div>
      {:else}
        <StudentTable {students} />
      {/if}
    </section>
  </div>
</div>
