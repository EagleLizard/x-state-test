
import './theme-palette.scss';
import React from 'react';

import { Button, Checkbox } from '@material-ui/core';
import { Page } from '../layout';

interface ButtonVariantDef {
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  disableElevation?: boolean;
}

const DEFAULT_BUTTON_VARIANTS: ButtonVariantDef[] = [
  {},
  {
    color: 'primary',
  },
  {
    color: 'secondary',
  },
];

const CONTAINED_NO_ELEVATION_BUTTON_VARIANTS: ButtonVariantDef[] = [
  {
    variant: 'contained',
    disableElevation: true,
  },
  {
    variant: 'contained',
    color: 'primary',
    disableElevation: true,
  },
  {
    variant: 'contained',
    color: 'secondary',
    disableElevation: true,
  },
];

const CONTAINED_BUTTON_VARIANTS: ButtonVariantDef[] = [
  {
    variant: 'contained',
  },
  {
    variant: 'contained',
    color: 'primary',
  },
  {
    variant: 'contained',
    color: 'secondary',
  },
];

const OUTLINED_BUTTON_VARIANTS: ButtonVariantDef[] = [
  {
    variant: 'outlined',
  },
  {
    variant: 'outlined',
    color: 'primary',
  },
  {
    variant: 'outlined',
    color: 'secondary',
  },
];

interface ThemePaletteProps {

}

export function ThemePalette(props: ThemePaletteProps) {
  return (
    <Page>
      <div className="theme-palette">
        <div className="button-palette-container">
          <div className="button-palette">
            <ButtonVariantPalette
              buttonVariantDefs={DEFAULT_BUTTON_VARIANTS}
              headerContent={'Default'}
            />
          </div>
          <div className="button-palette">
            <ButtonVariantPalette
              buttonVariantDefs={CONTAINED_BUTTON_VARIANTS}
              headerContent={'Contained'}
            />
          </div>
          <div className="button-palette">
            <ButtonVariantPalette
              buttonVariantDefs={CONTAINED_NO_ELEVATION_BUTTON_VARIANTS}
              headerContent={
                <div>
                  <div>
                    Contained,
                  </div>
                  <div>
                    Disable Elevation
                  </div>
                </div>
              }
            />
          </div>
          <div className="button-palette">
            <ButtonVariantPalette
              buttonVariantDefs={OUTLINED_BUTTON_VARIANTS}
              headerContent={'Outlined'}
            />
          </div>
        </div>
        <div className="checkbox-palette-container">
          <div className="checkbox-palette">
            <Checkbox
            />
          </div>
          <div className="checkbox-palette">
            <Checkbox
              color="primary"
            />
          </div>
          <div className="checkbox-palette">
            <Checkbox
              color="secondary"
            />
          </div>
          <div className="checkbox-palette">
            <Checkbox
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

interface ButtonVariantPaletteProps {
  headerContent: string | JSX.Element;
  buttonVariantDefs: ButtonVariantDef[];
}

function ButtonVariantPalette(props: ButtonVariantPaletteProps) {
  return (
    <div className="button-variant-container contained disable-elevation">
      <div className="button-variant-header">
        {
          props.headerContent
        }
      </div>
      {props.buttonVariantDefs.map((buttonVariantDef, idx) => {
        return (
          <div
            className="button-container"
            key={idx}
          >
            <ButtonVariant
              buttonVariantDef={buttonVariantDef}
            />
          </div>
        );
      })}
    </div>
  );
}

interface ButtonVariantProps {
  buttonVariantDef: ButtonVariantDef;
}

function ButtonVariant(props: ButtonVariantProps) {
  let buttonVariant: ButtonVariantDef, buttonText: string;
  buttonVariant = props.buttonVariantDef;
  switch(buttonVariant.color) {
    case 'primary':
      buttonText = 'Primary';
      break;
    case 'secondary':
      buttonText = 'Secondary';
      break;
    default:
      buttonText = 'Default';
  }
  return (
    <Button
      variant={buttonVariant.variant}
      color={buttonVariant.color}
      disableElevation={buttonVariant.disableElevation ?? false}
    >
      {
        buttonText
      }
    </Button>
  );
}
