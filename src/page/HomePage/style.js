import styled, { css } from "styled-components";

export const ContentItem = styled.div`
  position: relative;
  z-index: 1;
  & > .ContentThumb {
    overflow: hidden;
    position: relative;
    z-index: 2;
    padding-top: percentage(716/945);
    @include transition-all(0.2s);
    background: $color-white;
    img {
      width: 100%;
      height: auto;
      min-height: 100%;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      @include transition-all(0.2s);
    }
  }
  & > .ContentCaption {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 10px;
  }
  & > .ContentDesc {
    color: $color-white;
    text-align: right;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    margin-bottom: 30px;
    line-height: 2.2;
    @include transition-all(0.2s);
    opacity: 0;
  }
  & > .ContentItemTitle {
    color: $color-white;
    text-align: right;
    font-family: $font-sh-imogen-agnes;
    font-size: 80px;
    line-height: 0.6;
    @include transition-all(0.2s);
    span {
      display: block;
      font-size: 35px;
    }
  }
  & > .ContentItemContent {
    position: absolute;
    z-index: 2;
    top: 50px;
    bottom: 5px;
    left: 10px;
    width: percentage(1/2);
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    @include transition-all(0.2s);
    opacity: 0;
    h6 {
      color: $color-white;
      text-transform: uppercase;
      font-size: 9px;
      line-height: 1.5;
      letter-spacing: 2px;
      margin: 0 0 10px;
    }
    .b-maincontent {
      color: $color-white;
      //text-transform: uppercase;
      font-size: 8px;
      line-height: 11px;
    }
  }
`;
export const containerWrapper3 = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin-bottom: 1px;
      & :nth-child(2n) {
        & > .ContentItem {
          & > .ContentCaption {
            align-items: flex-start;
          }
          & > .ContentDesc {
            text-align: left;
          }
          & > .ContentItemTitle {
            text-align: left;
          }
          & > .ContentItemContent {
            text-align: right;
            left: auto;
            right: 10px;
          }
        }
      }
      &:hover {
        position: relative;
        z-index: 2;
        & > .ContentItem {
          //@include transform(scale(1.05) translate3d(2%,0,0));
          &__thumb {
            background: rgba($color-black, 0.7);
            img {
              filter: blur(15px);
              opacity: 0.7;
            }
          }
          &__desc {
            opacity: 1;
          }
          &__content {
            opacity: 1;
          }
        }
      }
      & :nth-child(2n) {
        &:hover {
          .c-whyus-item {
            //@include transform(scale(1.05) translate3d(-2%,0,0));
          }
        }
      }
    }
  }
`;
