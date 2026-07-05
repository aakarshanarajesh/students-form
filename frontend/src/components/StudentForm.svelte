<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let form = {
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    department: '',
    course: '',
    yearOfStudy: '',
    address: ''
  };

  let errors = {};
  export let isSubmitting = false;
  export let formError = '';
  export let successMessage = '';

  export function resetForm() {
    form = {
      fullName: '',
      studentId: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      department: '',
      course: '',
      yearOfStudy: '',
      address: ''
    };
    errors = {};
    formError = '';
    successMessage = '';
  }

  function validate() {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!form.studentId.trim()) nextErrors.studentId = 'Student ID is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
    else if (!/^\d{10,15}$/.test(form.phone)) nextErrors.phone = 'Phone number must contain 10 to 15 digits.';
    if (!form.age) nextErrors.age = 'Age is required.';
    else if (Number(form.age) < 1 || Number(form.age) > 120) nextErrors.age = 'Age must be between 1 and 120.';
    if (!form.gender) nextErrors.gender = 'Gender is required.';
    if (!form.department.trim()) nextErrors.department = 'Department is required.';
    if (!form.course.trim()) nextErrors.course = 'Course is required.';
    if (!form.yearOfStudy.trim()) nextErrors.yearOfStudy = 'Year of study is required.';
    if (!form.address.trim()) nextErrors.address = 'Address is required.';

    errors = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      formError = 'Please fix the highlighted fields.';
      successMessage = '';
      return;
    }

    dispatch('submit', { ...form, age: Number(form.age) });
  }
</script>

<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
  {#if formError}
    <div class="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">{formError}</div>
  {/if}
  {#if successMessage}
    <div class="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</div>
  {/if}

  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Full Name</span>
      <input bind:value={form.fullName} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="Jane Doe" />
      {#if errors.fullName}<p class="mt-1 text-sm text-red-500">{errors.fullName}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Student ID</span>
      <input bind:value={form.studentId} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="STU001" />
      {#if errors.studentId}<p class="mt-1 text-sm text-red-500">{errors.studentId}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Email</span>
      <input bind:value={form.email} type="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="jane@example.com" />
      {#if errors.email}<p class="mt-1 text-sm text-red-500">{errors.email}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Phone Number</span>
      <input bind:value={form.phone} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="9876543210" />
      {#if errors.phone}<p class="mt-1 text-sm text-red-500">{errors.phone}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Age</span>
      <input bind:value={form.age} type="number" min="1" max="120" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="18" />
      {#if errors.age}<p class="mt-1 text-sm text-red-500">{errors.age}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Gender</span>
      <select bind:value={form.gender} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500">
        <option value="">Select gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
      {#if errors.gender}<p class="mt-1 text-sm text-red-500">{errors.gender}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Department</span>
      <input bind:value={form.department} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="Engineering" />
      {#if errors.department}<p class="mt-1 text-sm text-red-500">{errors.department}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Course</span>
      <input bind:value={form.course} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="Computer Science" />
      {#if errors.course}<p class="mt-1 text-sm text-red-500">{errors.course}</p>{/if}
    </label>

    <label class="block">
      <span class="mb-1 block text-sm font-medium text-slate-700">Year of Study</span>
      <input bind:value={form.yearOfStudy} class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="1st Year" />
      {#if errors.yearOfStudy}<p class="mt-1 text-sm text-red-500">{errors.yearOfStudy}</p>{/if}
    </label>

    <label class="block md:col-span-2">
      <span class="mb-1 block text-sm font-medium text-slate-700">Address</span>
      <textarea bind:value={form.address} rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500" placeholder="Enter address"></textarea>
      {#if errors.address}<p class="mt-1 text-sm text-red-500">{errors.address}</p>{/if}
    </label>
  </div>

  <button type="submit" disabled={isSubmitting} class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300">
    {isSubmitting ? 'Submitting...' : 'Register Student'}
  </button>
</form>
