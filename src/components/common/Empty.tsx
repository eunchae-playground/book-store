import { ReactNode } from "react";
import { styled } from "styled-components";
import Title from "../common/Title";

interface Props {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
}

function Empty({ title, description, icon }: Props) {
  return (
    <EmptyStyle>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </EmptyStyle>
  );
}

const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default Empty;
