import { Property } from 'csstype';

interface IFlexOptions {
  flexDirection?: Property.FlexDirection;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  alignSelf?: Property.AlignSelf;
  flexWrap?: Property.FlexWrap;
  flexFlow?: Property.FlexFlow;
  alignContent?: Property.AlignContent;
}

export const flexOpts = (flexOpts: IFlexOptions = {}) => ({
  display: 'flex',
  ...flexOpts,
});

export const flexCenterOpts = (arg: IFlexOptions = {}) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...arg,
  };
};

export const flexSpaceBetweenCenterOpts = (arg: IFlexOptions = {}) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...arg,
  } as IFlexOptions;
};

export const flexAlignItemCenterOpts = (arg: IFlexOptions = {}) => {
  return {
    display: 'flex',
    alignItems: 'center',
    ...arg,
  } as IFlexOptions;
};
