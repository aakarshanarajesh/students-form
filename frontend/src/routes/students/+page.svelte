<script>
  import { onMount } from 'svelte';
  import StudentTable from '../../components/StudentTable.svelte';
  import StudentForm from '../../components/StudentForm.svelte';
  import { GET_STUDENTS_QUERY, UPDATE_STUDENT_MUTATION, DELETE_STUDENT_MUTATION } from '../../graphql/queries.js';
  import { sendGraphQL } from '$lib/graphql.js';

  let students = [];
  let loading = true;
  let errorMessage = '';
  let isEditModalOpen = false;
  let editingStudent = null;
  let studentForm;
  let isSubmitting = false;
  let formError = '';
  let successMessage = '';

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

  function openEditModal(student) {
    editingStudent = student;
    isEditModalOpen = true;
    formError = '';
    successMessage = '';
    studentForm?.setFormData(student);
  }

  function closeEditModal() {
    isEditModalOpen = false;
    editingStudent = null;
    studentForm?.resetForm();
    formError = '';
    successMessage = '';
  }

  async function handleEditSubmit(event) {
    isSubmitting = true;
    formError = '';
    successMessage = '';

    try {
      const input = event.detail;
      const updateInput = {
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        age: input.age,
        gender: input.gender,
        department: input.department,
        course: input.course,
        yearOfStudy: input.yearOfStudy,
        address: input.address
      };

      const data = await sendGraphQL(UPDATE_STUDENT_MUTATION, { id: editingStudent.id, input: updateInput });

      if (data?.updateStudent) {
        successMessage = 'Student updated successfully.';
        await loadStudents();
        setTimeout(() => closeEditModal(), 1500);
      }
    } catch (error) {
      formError = error.message;
    } finally {
      isSubmitting = false;
    }
  }

  async function deleteStudent(student) {
    if (!confirm(`Are you sure you want to delete ${student.fullName}? This action cannot be undone.`)) {
      return;
    }

    try {
      await sendGraphQL(DELETE_STUDENT_MUTATION, { id: student.id });
      await loadStudents();
    } catch (error) {
      errorMessage = error.message;
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
        <StudentTable {students} onEdit={openEditModal} onDelete={deleteStudent} />
      {/if}
    </section>
  </div>
</div>

{#if isEditModalOpen && editingStudent}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-slate-800">Edit Student</h2>
        <button on:click={closeEditModal} class="text-slate-500 transition hover:text-slate-700">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <StudentForm
        bind:this={studentForm}
        on:submit={handleEditSubmit}
        isEditMode={true}
        {isSubmitting}
        bind:formError
        bind:successMessage
      />
    </div>
  </div>
{/if}
