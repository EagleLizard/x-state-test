
import './simple-fetch.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createMachine, EventObject } from 'xstate';
import { useMachine } from '@xstate/react';
import {
  Button,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';

enum FETCH_MACHINE_STATES {
  DEFAULT = 'DEFAULT',
  FETCHING = 'FETCHING',
  SUCCEED = 'SUCCEED',
  FAIL = 'FAIL',
}
enum FETCH_MACHINE_EVENT_ENUM {
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  RESET = 'RESET',
  CANCEL = 'CANCEL',
}

interface FetchMachineEvent extends EventObject {
  type: FETCH_MACHINE_EVENT_ENUM,
}
interface FetchMachineContext {
  data?: string;
}

const fetchMachine = createMachine<FetchMachineContext, FetchMachineEvent>({
  id: 'fetch_machine',
  initial: FETCH_MACHINE_STATES.DEFAULT,
  states: {
    [FETCH_MACHINE_STATES.DEFAULT]: {
      on: {
        [FETCH_MACHINE_EVENT_ENUM.FETCH]: {
          target: FETCH_MACHINE_STATES.FETCHING,
        },
      }
    },
    [FETCH_MACHINE_STATES.FETCHING]: {
      on: {
        [FETCH_MACHINE_EVENT_ENUM.SUCCESS]: {
          target: FETCH_MACHINE_STATES.SUCCEED,
        },
        [FETCH_MACHINE_EVENT_ENUM.ERROR]: {
          target: FETCH_MACHINE_STATES.FAIL,
        },
        [FETCH_MACHINE_EVENT_ENUM.CANCEL]: {
          target: FETCH_MACHINE_STATES.DEFAULT,
        },
      },
    },
    [FETCH_MACHINE_STATES.SUCCEED]: {
      on: {
        [FETCH_MACHINE_EVENT_ENUM.RESET]: {
          target: FETCH_MACHINE_STATES.DEFAULT,
        }
      }
    },
    [FETCH_MACHINE_STATES.FAIL]: {
      on: {
        [FETCH_MACHINE_EVENT_ENUM.RESET]: {
          target: FETCH_MACHINE_STATES.DEFAULT,
        }
      }
    },
  }
});

interface FetchData {
  message: string,
  data: number[],
}

interface SimpleFetchProps {

}

export function SimpleFetch(props: SimpleFetchProps) {
  const [ fetchData, setFetchData ] = useState<FetchData>();
  const [ doFail, setDoFail ] = useState<boolean>(false);
  const [ current, send ] = useMachine(fetchMachine);

  useEffect(() => {
    if(current.matches(FETCH_MACHINE_STATES.FETCHING)) {
      doFetch();
    }
    if(current.matches(FETCH_MACHINE_STATES.SUCCEED)) {
      // send(FETCH_MACHINE_EVENT_ENUM.RESET);
    }
  }, [ current.event ]);

  return (
    <div className="simple-fetch">
      <div>
        currState: {current.value}
      </div>
      <div className="simple-fetch-content">
        <div className="input-container">
          <div className="fail-select-container input-section">
            <div className="checkbox-container">
              <Checkbox
                checked={doFail}
                color="primary"
                onChange={handleFailCheckboxChange}
              />
            </div>
            <div className="checkbox-label">
              Fail Request
            </div>
          </div>
          <div className="fetch-buttons input-section">
            <Button
              variant="contained"
              disableElevation
              onClick={handleFetchClick}
              disabled={isFetchButtonDisabled()}>
              Fetch
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              onClick={handleCancelClick}
              disabled={isCancelButtonDisabled()}>
              Cancel
            </Button>
          </div>
          <div className="reset-button-container input-section">
            {showResetButton() && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleResetButtonClick}>
                Reset
              </Button>
            )}
          </div>
          <div className="spinner-container input-section">
            {showSpinner() && (
              <CircularProgress/>
            )}
          </div>
        </div>
        <div className="result-container">
          <div className="result-header">
            Result:
          </div>
          <div>
            {
              getFetchResult()
            }
          </div>
        </div>
      </div>
    </div>
  );

  function getFetchResult() {
    switch(current.value) {
      case FETCH_MACHINE_STATES.SUCCEED:
        return JSON.stringify(fetchData, null, 2);
      case FETCH_MACHINE_STATES.FAIL:
        return 'failed';
      default:
        return 'pending';
    }
  }

  function handleFailCheckboxChange(evt: ChangeEvent<HTMLInputElement>) {
    let checked: boolean;
    checked = evt.target.checked;
    setDoFail(checked);
  }

  function isFetchButtonDisabled(): boolean {
    return !current.matches(FETCH_MACHINE_STATES.DEFAULT);
  }

  function isCancelButtonDisabled(): boolean {
    return !current.matches(FETCH_MACHINE_STATES.FETCHING);
  }

  function showResetButton(): boolean {
    return (
      current.matches(FETCH_MACHINE_STATES.SUCCEED)
      || current.matches(FETCH_MACHINE_STATES.FAIL)
    );
  }

  function showSpinner(): boolean {
    return current.matches(FETCH_MACHINE_STATES.FETCHING);
  }

  function handleResetButtonClick() {
    send(FETCH_MACHINE_EVENT_ENUM.RESET);
  }

  function handleCancelClick() {
    send(FETCH_MACHINE_EVENT_ENUM.CANCEL);
  }

  function handleFetchClick() {
    send(FETCH_MACHINE_EVENT_ENUM.FETCH);
  }

  async function doFetch() {
    let data: FetchData;
    try {
      data = await getData(1500, doFail);
      setFetchData(data);
      send(FETCH_MACHINE_EVENT_ENUM.SUCCESS);
    } catch(e) {
      send(FETCH_MACHINE_EVENT_ENUM.ERROR);
    }
  }
}

function getData(ms: number, doFail = false): Promise<FetchData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(doFail) {
        reject(new Error('Request failed'));
      } else {
        resolve({
          message: 'hi ~',
          data: [ 1, 2, 3 ],
        });
      }
    }, ms);
  });
}
