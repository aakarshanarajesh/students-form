<script>
  export let students = [];
  export let onEdit = null;
  export let onDelete = null;
</script>

<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50 text-left text-sm font-semibold text-slate-700">
        <tr>
          <th class="px-4 py-3">Student ID</th>
          <th class="px-4 py-3">Full Name</th>
          <th class="px-4 py-3">Email</th>
          <th class="px-4 py-3">Department</th>
          <th class="px-4 py-3">Course</th>
          <th class="px-4 py-3">Year</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
        {#if students.length === 0}
          <tr>
            <td class="px-4 py-6 text-center text-slate-500" colspan="7">No students found.</td>
          </tr>
        {:else}
          {#each students as student}
            <tr class="hover:bg-slate-50">
              <td class="px-4 py-3 font-medium text-slate-800">{student.studentId}</td>
              <td class="px-4 py-3">{student.fullName}</td>
              <td class="px-4 py-3">{student.email}</td>
              <td class="px-4 py-3">{student.department}</td>
              <td class="px-4 py-3">{student.course}</td>
              <td class="px-4 py-3">{student.yearOfStudy}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  {#if onEdit}
                    <button
                      on:click={() => onEdit(student)}
                      class="rounded bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 transition hover:bg-sky-200"
                    >
                      Edit
                    </button>
                  {/if}
                  {#if onDelete}
                    <button
                      on:click={() => onDelete(student)}
                      class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                    >
                      Delete
                    </button>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
