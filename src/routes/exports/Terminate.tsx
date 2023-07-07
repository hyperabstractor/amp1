
    import { RouteDataArgs, useRouteData } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import { formDataToPlainObject } from '~/utils/formDataToPlainObject'
import { db } from '~/config'
import { OneInput } from 'ui/OneInput'
import { OneSelect } from 'ui/OneSelect'
import { OneMatrixInput } from 'ui/OneMatrixInput'
import { OneRadio } from 'ui/OneRadio'
import { OneSignature } from 'ui/OneSignature'
import { createSignal, createResource } from 'solid-js';
import { Show, For, Switch, Match } from 'solid-js/web';
import './base.css';
import './terminate.css';
    

    const collectionKey: any = 'terminate'

    export function routeData({ params }: RouteDataArgs) {
          return createServerData$(async () => {
            const data = await db.selectFrom(collectionKey).selectAll().execute()
            return data
          })
        }
OneInput
OneSelect
OneMatrixInput
OneRadio
OneSignature

    

    
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
        <Form class="css_ljieopyn" data-name="terminate">
<div class="css_ljieopyo">
<h2 class="css_ljieopyp">
GROUP TERMINATION REQUEST
</h2>
</div>
<fieldset class="css_ljieopyq">
<legend class="css_ljieopyr">
IMPORTANT INFORMATION
</legend>
<p class="css_ljieopys">
We're sorry to see you leave, we know that decisions about employee benefits are difficult, the health and well-being of your employees is paramount. We are here to ensure you have the smoothest transition possible. Do not hesitate to let us know if there is anything we can do to help. If you have questions on how to complete this form, please contact your Account Manager. All sections must be completed before termination requests will be processed. If your group pays its premium through autopay, it is your responsibility to stop autopay once all premium owed has been paid. If you have questions on how to stop autopay, please call Mid Atlantic States Employer and Broker Services at (202) 573-2276.
</p>
</fieldset>
<fieldset class="css_ljieopyt">
<legend class="css_ljieopyu">
1. COMPANY INFORMATION
</legend>
<one-input data-type="component" data-custom="true" type="text" name="company_name" label="Company Name" required="true" class="css_ljieopyv"></one-input>
<one-select data-custom="true" data-type="ONE-SELECT" name="group_id" label="Group ID" required="true" class="css_ljieopyw" options="[&quot;123456&quot;,&quot;123457&quot;,&quot;123458&quot;]"></one-select>
</fieldset>
<fieldset class="css_ljieopyx">
<legend class="css_ljieopyy">
2. TERMINATION DATE
</legend>
<div class="css_ljieopyz">
Unless a balance is owed to your account, your account will be terminated on the termination date below (a group termination can be processed in the month received or future month.)
</div>
<div class="css_ljieopz0">
<one-input data-type="component" data-custom="true" type="date" name="terminate_date" label="Termination effective date" required="true" class="css_ljieopz1"></one-input>
<one-input data-type="component" data-custom="true" type="date" name="contract_date" label="Contract effective date" required="true" class="css_ljieopz2"></one-input>
<one-input data-type="component" data-custom="true" type="text" name="broker_name" label="Broker of Record" required="true" class="css_ljieopz3"></one-input>
</div>
</fieldset>
<fieldset class="css_ljieopz4">
<legend class="css_ljieopz5">
3. REASON FOR TERMINATION
</legend>
<div class="css_ljieopz6">
Please select one Primary Reason (P) and any Secondary (S) reasons for termination below:
</div>
<one-matrix-input label="Reason for Termination" name="reason" options="[&quot;P&quot;,&quot;S&quot;]" questions="[&quot;Received competitor discount/rates not competitive&quot;,&quot;Dissatisfaction with PPO/POS/Out of Area Design&quot;,&quot;Dissatisfaction with facilities and locations&quot;,&quot;Dissatisfaction with access to Non-Kaiser Permanente care&quot;,&quot;Dissatisfaction with convenient access to care&quot;,&quot;Dissatisfaction with quality of Non-Kaiser Permanente care&quot;,&quot;Dissatisfaction with quality of care received&quot;,&quot;Purchased by or merged with another company&quot;,&quot;Dissatisfaction with Health Plan Customer Service&quot;,&quot;Out of business/closed regional operations&quot;,&quot;Dissatisfaction w/Admin Services/Claims&quot;,&quot;Group no longer offering employer health insurance&quot;]" value="[]" class="css_ljieopz7"></one-matrix-input>
<one-input data-type="component" data-custom="true" type="textarea" name="reason_other" label="Is there anything else you would like to share about your decision to drop Kaiser Permanente coverage?" class="css_ljieopz8"></one-input>
<one-input data-type="component" data-custom="true" type="number" name="recommend" label="How likely would you be to recommend Kaiser Permanente health insurance to other companies? (1-10)" class="css_ljieopz9" min="1" max="10"></one-input>
<div class="css_ljieopza">
<h3 class="css_ljieopzb">
Alternate Insurance
</h3>
<one-radio data-custom="true" name="alternate_insurance" label="Please select only one option below, if applicable:" options="[&quot;Fully Insured Group&quot;,&quot;Self-Funded Group&quot;,&quot;Exchanges (Individual)&quot;,&quot;Medicare&quot;]" class="css_ljieopzc"></one-radio>
</div>
<div class="css_ljieopzd">
<h3 class="css_ljieopze">
Alternate Carrier
</h3>
<one-radio data-custom="true" name="alternate_carrier" label="Please select only one option below, if applicable:" options="[&quot;Aetna&quot;,&quot;Anthem&quot;,&quot;Cigna&quot;,&quot;CareFirst&quot;,&quot;United Healthcare&quot;]" class="css_ljieopzf"></one-radio>
</div>
</fieldset>
<fieldset class="css_ljieopzg">
<legend class="css_ljieopzh">
4. READ AND SIGN
</legend>
<div class="css_ljieopzi">
I affirm that I am authorized to contract on behalf of the group with Kaiser Foundation Health Plan, Inc., and Kaiser Permanente Insurance Company, and I am authorized to submit this termination request on behalf of the group. I represent that all the information provided is true and accurate to the best of my knowledge
</div>
<one-input data-type="component" data-custom="true" type="text" name="authorized_company" label="Authorized company signer (print name)" required="true" class="css_ljieopzj"></one-input>
<one-input data-type="component" data-custom="true" type="text" name="company_title" label="Company title (print name)" required="true" class="css_ljieopzk"></one-input>
<one-signature class="css_ljieopzl" name="company_signature" label="Company signature"></one-signature>
<one-input data-type="component" data-custom="true" type="date" name="company_date" label="Date" required="true" class="css_ljieopzm"></one-input>
</fieldset>
<div class="css_ljieopzn">
<button class="css_ljieopzo">
Submit
</button>
</div>
</Form>

        <div class='absolute w-full z-50 bottom-0'>
        <button
          type='button'
          class='h-8 absolute -top-10 right-0 px-4'
          onClick={() => setDataOpen(!dataOpen())}
        >
          Records
        </button>

          <div
            class='h-full flex flex-col p-4 bg-blue-500'
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
    