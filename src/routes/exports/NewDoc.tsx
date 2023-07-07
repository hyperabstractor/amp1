
    import { createSignal, createResource } from 'solid-js';
import { Show, For, Switch, Match } from 'solid-js/web';
import './base.css';
    

    

    

    
    // eslint-disable-next-line react/display-name, import/no-anonymous-default-export
    export default () => {

      const [dataOpen, setDataOpen] = createSignal(false)

      
      
      

      return (
        <>
        <div class="bg-white py-6 sm:py-8 lg:py-12 _comp" data-comp="true">
<div class="mx-auto max-w-screen-lg px-4 md:px-8 _comp" data-comp="true">
<div class="grid gap-8 md:grid-cols-2 _comp" data-comp="true">
<div class="space-y-4 _comp" data-comp="true">
<div class="relative overflow-hidden rounded-lg bg-gray-100 _comp" data-comp="true">
<img src="https://images.unsplash.com/flagged/photo-1571366992942-be878c7b10c0?auto=format&amp;q=75&amp;fit=crop&amp;w=600" loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center _comp" data-comp="true"/>
<span class="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white _comp" data-comp="true">
sale
</span>
</div>
<div class="grid grid-cols-2 gap-4 _comp" data-comp="true">
<div class="overflow-hidden rounded-lg bg-gray-100 _comp" data-comp="true">
<img src="https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&amp;q=75&amp;fit=crop&amp;w=250" loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center _comp" data-comp="true"/>
</div>
<div class="overflow-hidden rounded-lg bg-gray-100 _comp" data-comp="true">
<img src="https://images.unsplash.com/flagged/photo-1571366992968-15b65708ee76?auto=format&amp;q=75&amp;fit=crop&amp;w=250" loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center _comp" data-comp="true"/>
</div>
</div>
</div>
<div class="md:py-8 _comp" data-comp="true">
<div class="mb-2 md:mb-3 _comp" data-comp="true">
<span class="mb-0.5 inline-block text-gray-500 _comp" data-comp="true">
Fancy Brand
</span>
<h2 class="text-2xl font-bold text-gray-800 lg:text-3xl _comp" data-comp="true">
Pullover with pattern
</h2>
</div>
<div class="mb-6 flex items-center md:mb-10 _comp" data-comp="true">
<div class="-ml-1 flex gap-0.5 _comp" data-comp="true">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 _comp" viewBox="0 0 20 20" fill="currentColor" data-comp="true">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-comp="true" class="_comp"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 _comp" viewBox="0 0 20 20" fill="currentColor" data-comp="true">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-comp="true" class="_comp"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 _comp" viewBox="0 0 20 20" fill="currentColor" data-comp="true">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-comp="true" class="_comp"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 _comp" viewBox="0 0 20 20" fill="currentColor" data-comp="true">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-comp="true" class="_comp"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 _comp" viewBox="0 0 20 20" fill="currentColor" data-comp="true">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-comp="true" class="_comp"></path>
</svg>
</div>
<span class="ml-2 text-sm text-gray-500 _comp" data-comp="true">
4.2
</span>
<a href="#" class="ml-4 text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700 _comp" data-comp="true">
view all 47 reviews
</a>
</div>
<div class="mb-4 md:mb-6 _comp" data-comp="true">
<span class="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base _comp" data-comp="true">
Color
</span>
<div class="flex flex-wrap gap-2 _comp" data-comp="true">
<span class="h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100 _comp" data-comp="true"></span>
<button type="button" class="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200 _comp" data-comp="true"></button>
<button type="button" class="h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200 _comp" data-comp="true"></button>
<button type="button" class="h-8 w-8 rounded-full border bg-white ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200 _comp" data-comp="true"></button>
</div>
</div>
<div class="mb-8 md:mb-10 _comp" data-comp="true">
<span class="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base _comp" data-comp="true">
Size
</span>
<div class="flex flex-wrap gap-3 _comp" data-comp="true">
<button type="button" class="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200 _comp" data-comp="true">
XS
</button>
<button type="button" class="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200 _comp" data-comp="true">
S
</button>
<span class="flex h-8 w-12 cursor-default items-center justify-center rounded-md border border-indigo-500 bg-indigo-500 text-center text-sm font-semibold text-white _comp" data-comp="true">
M
</span>
<button type="button" class="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200 _comp" data-comp="true">
L
</button>
<span class="flex h-8 w-12 cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-white text-center text-sm font-semibold text-gray-400 _comp" data-comp="true">
XL
</span>
</div>
</div>
<div class="mb-4 _comp" data-comp="true">
<div class="flex items-end gap-2 _comp" data-comp="true">
<span class="text-xl font-bold text-gray-800 md:text-2xl _comp" data-comp="true">
$15.00
</span>
<span class="mb-0.5 text-red-500 line-through _comp" data-comp="true">
$30.00
</span>
</div>
<span class="text-sm text-gray-500 _comp" data-comp="true">
incl. VAT plus shipping
</span>
</div>
<div class="mb-6 flex items-center gap-2 text-gray-500 _comp" data-comp="true">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 _comp" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-comp="true">
<path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" data-comp="true" class="_comp"></path>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" data-comp="true" class="_comp"></path>
</svg>
<span class="text-sm _comp" data-comp="true">
2-4 day shipping
</span>
</div>
<div class="flex gap-2.5 _comp" data-comp="true">
<a href="#" class="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base _comp" data-comp="true">
Add to cart
</a>
<a href="#" class="inline-block rounded-lg bg-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base _comp" data-comp="true">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 _comp" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-comp="true">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-comp="true" class="_comp"></path>
</svg>
</a>
</div>
<div class="mt-10 md:mt-16 lg:mt-20 _comp" data-comp="true">
<div class="mb-3 text-lg font-semibold text-gray-800 _comp" data-comp="true">
Description
</div>
<p class="text-gray-500 _comp" data-comp="true">
This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.
<br data-comp="true" class="_comp"/>
<br data-comp="true" class="_comp"/>
This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.
</p>
</div>
</div>
</div>
</div>
</div>

        <div class='absolute w-full z-50 bottom-0'>
        <button
          type='button'
          class='h-8 absolute -top-10 right-0 px-4'
          onClick={() => setDataOpen(!dataOpen())}
        >
          Records
        </button>

          <div
            class='h-full flex flex-col p-4 bg-gray-100'
            classList={{
              hidden: !dataOpen(),
            }}
          >
          
          </div>
        </div>
        </>
      )
    }

    const processClasses = []
    