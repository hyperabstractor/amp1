
    import { RouteDataArgs, useRouteData } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import { formDataToPlainObject } from '~/utils/formDataToPlainObject'
import { db } from '~/config'
import { OneSelect } from 'ui/OneSelect'
import { OneRadio } from 'ui/OneRadio'
import { OneCheckbox } from 'ui/OneCheckbox'
import { createSignal, createResource } from 'solid-js';
import { Show, For, Switch, Match } from 'solid-js/web';
import './base.css';
import './responsive.css';
    

    const collectionKey: any = 'testform4'

    export function routeData({ params }: RouteDataArgs) {
          return createServerData$(async () => {
            const data = await db.selectFrom(collectionKey).selectAll().execute()
            return data
          })
        }
OneSelect
OneRadio
OneCheckbox

    

    
    // eslint-disable-next-line react/display-name, import/no-anonymous-default-export
    export default () => {

      const [dataOpen, setDataOpen] = createSignal(false)

      const data = useRouteData<typeof routeData>()
      
      const [creating, { Form }] = createServerAction$(
          async (formData: FormData, { request }) => {
            const values = formDataToPlainObject(formData)
            await db.insertInto(collectionKey).values(values).execute()
          }
        )
const [removing, remove] = createServerAction$(
          async (id: any) => await db.deleteFrom(collectionKey).where('id', '=', id).execute()
        )

      return (
        <>
        <Form class="css_ljsphma0" data-name="testform4">
<one-select data-custom="true" data-type="ONE-SELECT" name="select" label="Select" class="css_ljsphma1" options="[&quot;Option 1&quot;,&quot;Option 2&quot;,&quot;Option 3&quot;]"></one-select>
<one-radio data-custom="true" name="radio1" label="Radio 1" class="css_ljsphma2" columns="3" options="[&quot;Option 1&quot;,&quot;Option 2&quot;,&quot;Option 3&quot;]"></one-radio>
<one-checkbox data-type="ONE-CHECKBOX" data-custom="true" type="checkbox" name="check1" label="Check 1" class="css_ljsphma3" columns="3" options="[&quot;Option 1&quot;,&quot;Option 2&quot;,&quot;Option 3&quot;]"></one-checkbox>
<button type="submit" class="css_ljsphma4">
Submit
</button>
</Form>

        <div class='sticky w-full z-50 bottom-0'>
        <button
          type='button'
          class='h-8 absolute -top-10 right-0 px-4 bg-blue-600 text-white'
          onClick={() => setDataOpen(!dataOpen())}
        >
          Records
        </button>

          <div
            class='h-full flex flex-col p-4 bg-blue-600'
            classList={{
              hidden: !dataOpen(),
            }}
          >
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
                      <button class='btn btn-sm btn-error' onClick={() => remove(item.id)}>
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
          </div>
        </div>
        </>
      )
    }

    const processClasses = []
    