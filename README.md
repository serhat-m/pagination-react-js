# pagination-react-js

A React Pagination component, which is lightweight, fast and easy to use.

## Live Demo
<a href="https://serhat-m.github.io/pagination-react-js" target="_blank">https://serhat-m.github.io/pagination-react-js</a>

## Install

```bash
npm i pagination-react-js
```

## Example

```jsx
import { generateTestData, usePagination, Pagination } from "pagination-react-js"

const App = () => {
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10)

  const dataList = generateTestData(700, (i) => ({ id: `Id${i}`, name: `Name${i}` }))

  return (
    <div className="container">
      <table>
        <tbody>
          {
            dataList.slice(entries.indexOfFirst, entries.indexOfLast).map(entry => {
              return <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
              </tr>
            })
          }
        </tbody>
      </table>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={dataList.length}
        currentPage={{ get: currentPage.get, set: currentPage.set }}
        offset={3}
        classNames={{
          wrapper: "pagination m-auto",
          item: "pagination-item",
          itemActive: "pagination-item-active",
          navPrev: "pagination-item nav-item",
          navNext: "pagination-item nav-item",
          navStart: "pagination-item nav-item",
          navEnd: "pagination-item nav-item",
          navPrevCustom: "pagination-item",
          navNextCustom: "pagination-item"
        }}
        showFirstNumberAlways={true}
        showLastNumberAlways={true}
        navStart="&#171;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navEnd="&#187;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navPrev="&#x2039;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navNext="&#x203a;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" /* Here you can pass anything (Text, HTML Tag, React Component, ...) */ }}
        navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" /* Here you can pass anything (Text, HTML Tag, React Component, ...) */ }}
      />
    </div>
  )
}

export default App
```

## API

### Hook: `usePagination(initialPage, maxEntriesPerPage)`

Used to generate pagination relevant data and state.

#### Function Parameters

1. `initialPage` `number` *Initial active page number*
2. `maxEntriesPerPage` `number` *Maximum number of entries per page*

#### Returns

```tsx
// ℹ️ The returned values are all read-only and must always be updated with the associated setter function.

{
  currentPage: {
    get: number, // Returns the active page number
    set: (arg: number) => void // Updates the active page number
  },
  entriesPerPage: {
    get: number, // Returns the maximum number of entries per page
    set: (arg: number) => void // Updates the maximum number of entries per page
  },
  entries: {
    indexOfFirst: number, // Returns the index for the first entry
    indexOfLast: number // Returns the index for the last entry
  }
}
```

### Component: `<Pagination />`

Used to generate the pagination.

#### Props

![https://user-images.githubusercontent.com/51929566/210173439-ce65e5cf-ff7c-482c-9450-920f063e48d5.svg](https://user-images.githubusercontent.com/51929566/210173439-ce65e5cf-ff7c-482c-9450-920f063e48d5.svg)

```tsx
// ℹ️ Options marked with "?" are optional.

// Here you can pass the corresponding "entriesPerPage" data from the usePagination Hook
entriesPerPage: entriesPerPage.get

// Specify the number of entries
totalEntries: yourDataList.length

// Here you can pass the corresponding "currentPage" data from the usePagination Hook
currentPage: {{ get: currentPage.get, set: currentPage.set }}

// Number of digits displayed before and after the active page number
offset: number

// Object, for assigning classNames
classNames?: {
    wrapper?: string, // <ul /> wrapper
    item?: string, // Every number <li />
    itemActive?: string, // Active number
    navStart?: string,
    navEnd?: string,
    navPrev?: string,
    navNext?: string,
    navPrevCustom?: string,
    navNextCustom?: string
}

// Always show the first number of the pagination
showFirstNumberAlways?: true

// Always show the last number of the pagination
showLastNumberAlways?: true

// Element that navigates to the start
// Here you can pass anything (Text, HTML Tag, React Component, ...)
navStart?: any

// Element that navigates to the end
// Here you can pass anything (Text, HTML Tag, React Component, ...)
navEnd?: any

// Element that navigates one step back
// Here you can pass anything (Text, HTML Tag, React Component, ...)
navPrev?: any

// Element that navigates one step forward
// Here you can pass anything (Text, HTML Tag, React Component, ...)
navNext?: any

// Element that navigates a custom step back. Always shown after the "showFirstNumberAlways" element, if active.
// Content can be anything (Text, HTML Tag, React Component, ...)
navPrevCustom?: { steps: number, content: any }

// Element that navigates a custom step forward. Always shown before the "showLastNumberAlways" element, if active.
// Content can be anything (Text, HTML Tag, React Component, ...)
navNextCustom?: { steps: number, content: any }
```

#### Example rendered **structure**

```html
<ul class="pagination">
    <li class="pagination-item nav-item">Go to the start</li>
    <li class="pagination-item nav-item">Step backwards</li>
    <li class="pagination-item">1</li>
    <li class="pagination-item">2</li>
    <li class="pagination-item pagination-item-active">3</li>
    <li class="pagination-item">4</li>
    <li class="pagination-item">5</li>
    <li class="pagination-item nav-item">Step forward</li>
    <li class="pagination-item nav-item">Go to the end</li>
</ul>
```

#### Example CSS

```css
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
}

.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 7px;
    width: fit-content;
    list-style-type: unset;
    border: 2px solid #e1e4e7;
    padding: 8px 10px;
    border-radius: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

.pagination-item {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.pagination-item:hover {
    cursor: pointer;
    background-color: #e1e4e7;
    -webkit-transition: background-color .1s linear;
    -moz-transition: background-color .1s linear;
    -o-transition: background-color .1s linear;
    transition: background-color .1s linear;
}

.pagination-item-active {
    color: white;
    background-color: #0a7ea3;
    pointer-events: none;
    -webkit-transition: background-color .1s linear;
    -moz-transition: background-color .1s linear;
    -o-transition: background-color .1s linear;
    transition: background-color .1s linear;
}

.pagination-item-active:hover {
    background-color: #0a7ea3;
}
```

### Function: `generateTestData(numberOfEntries, cb)`

Used to generate test data.

#### Function Parameters

1. `numberOfEntries` `number` *Number of entries*
2. `cb` `function` *Callback that receives an incrementing number as a parameter*

#### Returns

Array with test data.

#### Example

```jsx
import { generateTestData } from "pagination-react-js"

const dataList = generateTestData(700, i => ({ id: i, name: `Test ${i}` }))
// Result: [{ id: 1, name: "Test 1" }, and 699 more]
```