<script>
  import StudentForm from '../../components/StudentForm.svelte';
  import { ADD_STUDENT_MUTATION } from '../../graphql/queries.js';
  import { sendGraphQL } from '$lib/graphql.js';

  let isSubmitting = false;
  let formError = '';
  let successMessage = '';
  let studentForm;

  async function handleSubmit(event) {
    isSubmitting = true;
    formError = '';
    successMessage = '';

    try {
      const input = event.detail;
      const data = await sendGraphQL(ADD_STUDENT_MUTATION, { input });

      if (data?.addStudent) {
        successMessage = 'Student registered successfully.';
        studentForm?.resetForm();
      }
    } catch (error) {
      formError = error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Student Registration</title>
</svelte:head>

<div class="px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl space-y-8">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-800">Student Registration</h1>
      <p class="mt-2 text-sm text-slate-500">Complete the form below to save a new student record in MongoDB Atlas.</p>
      <div class="mt-6">
        <StudentForm bind:this={studentForm} on:submit={handleSubmit} {isSubmitting} {formError} {successMessage} />
      </div>
    </section>
  </div>
</div>
