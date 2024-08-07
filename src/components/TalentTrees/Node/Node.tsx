import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { NodeProps } from "./types";
import { getNodeImage } from "./utils";
import { NodeTooltip } from "./NodeTooltip/NodeTooltip";
import {
  MaxRankPointsSpan,
  MissingPointsButton,
  NotMaxRankPointsSpan,
  SelectedTalentButton,
} from "./styles";

function Node(props: NodeProps) {
  const [nodeImage, setNodeImage] = useState<string>("");

  useEffect(() => {
    setNodeImage(
      getNodeImage(
        props.className,
        props.node.isHeroNode ? props.node.heroClassName : props.specName,
        props.node.spellId.toString(),
        props.node.isClassTalent
      )
    );
  }, [props.className, props.specName, props.node.spellId]);

  if (props.node.rank === 0) {
    return (
      <Tooltip
        title={
          <NodeTooltip
            name={props.node.name}
            description={props.node.description}
          />
        }
        placement="top"
        arrow
      >
        <MissingPointsButton
          id={`${props.node.id}-${props.node.name}-missing-points`}
          nodeImage={nodeImage}
          passive={props.node.type === "passive"}
        >
          <NotMaxRankPointsSpan>
            {props.node.rank} / {props.node.totalRanks}
          </NotMaxRankPointsSpan>
        </MissingPointsButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={
        <NodeTooltip
          name={props.node.name}
          description={props.node.description}
        />
      }
      placement="top"
      arrow
    >
      <SelectedTalentButton
        id={`${props.node.id}-${props.node.name}-selected`}
        nodeImage={nodeImage}
        passive={props.node.type === "passive"}
        maxRank={props.node.rank === props.node.totalRanks}
      >
        {!props.node.isDefaultNode && (
          <MaxRankPointsSpan>
            {props.node.rank} / {props.node.totalRanks}
          </MaxRankPointsSpan>
        )}
      </SelectedTalentButton>
    </Tooltip>
  );
}

export { Node };
