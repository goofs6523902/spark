import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import SizedBox from "@components/SizedBox";
import { Column } from "./Flex";
import { useTheme } from "@emotion/react";
import Text from "@components/Text";

interface IOption {
  key: string;
  title: string;
}

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: IOption[];
  selected?: IOption;
  onSelect: (key: IOption) => void;
}

const Root = styled.div<{ focused?: boolean }>`
  display: flex;
  padding: 4px 4px 4px 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.header.walletAddressBackground};
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.grey200};
  align-items: center;
  white-space: nowrap;

  .menu-arrow {
    transition: 0.4s;
    transform: ${({ focused }) =>
      focused ? "rotate(-90deg)" : "rotate(0deg)"};
  }
`;
const Option = styled.div<{ active?: boolean }>`
  width: 100%;
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  font-size: 13px;
  line-height: 16px;
  padding: 4px 22px 4px 8px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 -16px;
  white-space: nowrap;

  :hover {
    background: ${({ theme }) => theme.colors.tooltip.hoverElement};
    border-radius: 4px;
  }

  ::after {
    transition: 0.4s;
    position: absolute;
    right: 2px;
  }
`;

const Select: React.FC<IProps> = ({ options, selected, onSelect, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const { images } = useTheme();
  return (
    <Tooltip
      config={{
        placement: "bottom-start",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      content={
        <Column
          crossAxisSize="max"
          style={{ borderRadius: 4, padding: "6px 8px" }}
        >
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => {
                  setFocused(false);
                  onSelect(v);
                }}
              >
                {v.title}
              </Option>
            );
          })}
        </Column>
      }
    >
      <Root
        focused={focused}
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      >
        <Text size="small">{selected?.title ?? options[0].title}</Text>
        <SizedBox width={10} />
        <img src={images.icons.arrowDown} className="menu-arrow" alt="arrow" />
      </Root>
    </Tooltip>
  );
};
export default Select;
