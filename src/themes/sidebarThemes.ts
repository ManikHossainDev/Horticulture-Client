import { ThemeConfig } from 'antd';
export const sidebardThemes: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: '#EB2926',
      itemSelectedColor: 'white',
      itemColor: 'black',
      // itemBg:"#232323",
      // itemHoverBg: "#232323",
      // itemHoverColor: "white",   
      borderRadiusLG: 0,
      itemMarginInline: 0,
    },
    Pagination: {
      colorPrimary: 'white',
      colorText: '#EA5326',
      colorPrimaryBorder: '#EA5326',
      colorPrimaryHover: '#EA5326',
      itemActiveBg: '#EA5326', 
      itemActiveBgDisabled: 'rgba(255, 255, 255, 0.15)',
    },
    Table: {
      // fontSize: 18,
      headerBorderRadius: 0,
      headerBg: '#EB2926',
      headerColor: 'white',
      // cellPaddingBlock: 13,
    },
  },

  token: {
    colorPrimary: '#4c9a29',
    colorInfo: '#4c9a29',
    colorLink: '#4c9a29',
    colorSuccess: '#4c9a29',
    colorBgBlur: '#e69211',
  },
};
