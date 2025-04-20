@if ($getRecord()->image_path)
    <img 
        src="{{ Storage::url($getRecord()->image_path) }}" 
        alt="Banner"
        class="p-2  rounded-lg"
        />
@endif
