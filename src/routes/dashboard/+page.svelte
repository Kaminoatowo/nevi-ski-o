<div class="flex-center">

    <h1>
        Dashboard
    </h1>
    
    <h2>
        Add station
    </h2>
    
    <form method="POST" action="?/add">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Name">
        
        <label for="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title">
        
        <label for="group">Group</label>
        <input type="text" id="group" name="group" placeholder="Group">
        
        <br>
        <button class="my-2 bg-warning-300 text-primary-600 rounded-lg w-full" type="submit">
            Add
        </button>
    </form>
</div>

<style>
    input {
        @apply text-primary-900;
    }
</style>