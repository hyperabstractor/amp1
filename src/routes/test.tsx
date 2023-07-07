import { Show, For } from 'solid-js'
import { RouteDataArgs, Title, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { db } from '~/config'

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(async () => {
    const data = await db.selectFrom('testform4').selectAll().execute()
    console.log('🟨 ☻ data: ', data)
    return data
  })
}

export default function Home() {
  const data = useRouteData<typeof routeData>()
  return (
    <main>
      <Title>Hello World</Title>
      <div class='h-full flex flex-col p-4 bg-gray-100'>
        <Show when={data()?.length} fallback={<div>0 records</div>}>
          <table class='table table-compact'>
            <thead>
              <tr>
                <For each={Object.keys(data()?.[0])}>
                  {(colName) => <th>{colName}</th>}
                </For>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <For each={data()}>
                {(item) => {
                  return (
                    <tr>
                      <For each={Object.values(item)}>
                        {(value: any) => <td>{value}</td>}
                      </For>
                      <td>
                        <button
                          type='button'
                          class='btn btn-sm btn-error'
                        //   onClick={() => remove(item.id)}
                          // onClick={(e) => onDeleteRecord(item.id, e)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                }}
              </For>
            </tbody>
          </table>
        </Show>
      </div>
    </main>
  )
}
