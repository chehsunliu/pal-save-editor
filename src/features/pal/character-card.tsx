import { useTranslation } from "react-i18next";
import Select, { ActionMeta } from "react-select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { attrKeys, EquipmentKey, equipmentKeys, useStats } from "@/features/pal/stats-provider.tsx";

type Props = {
  id: string;
};

type OptionType = {
  label: string;
  value: number;
};

const availableAbilityRanges = [[0x0127, 0x018d]];

const createValues = (ranges: number[][]): number[] =>
  ranges.reduce((acc, x) => {
    const [a0, a1] = x;
    return [...acc, ...Array.from({ length: a1 - a0 + 1 }, (_, i) => i + a0)];
  }, []);

const availableAbilities = createValues(availableAbilityRanges);

const availableEquipments = {
  head: [0x00c4, 0x00cf],
  clock: [0x00e1, 0x00ea],
  body: [0x00d1, 0x00e0],
  hand: [0x00a3, 0x00c3],
  foot: [0x00eb, 0x00f7],
  accessories: [0x00f8, 0x010b],
};

function CharacterCard({ id }: Props) {
  const { t } = useTranslation("pal");
  const { stats, isEditingDisabled, setAttr, setEquipment, appendAbility, removeAbility } = useStats();
  const char = stats.chars[id];

  const items = attrKeys.map((key) => (
    <div key={key}>
      <Label htmlFor={`${id}.${key}`}>{t(`attrs.${key}`)}</Label>
      <Input
        id={`${id}.${key}`}
        value={char.attrs[key]}
        onChange={(e) => setAttr(id, { key, value: parseInt(e.target.value, 10) })}
        disabled={isEditingDisabled()}
      />
    </div>
  ));

  const getValues = (values: number[], type: string): OptionType[] =>
    values.map((v) => ({
      value: v,
      label: t(`${type}.0x${v.toString(16).padStart(4, "0")}`),
    }));

  const abilityOptions: OptionType[] = getValues(availableAbilities, "abilities");
  const abilities: OptionType[] = getValues(char.abilities, "abilities");

  const handleValueChange = (_values: ReadonlyArray<OptionType>, meta: ActionMeta<OptionType>) => {
    switch (meta.action) {
      case "select-option":
        if (meta.option === undefined) {
          break;
        }
        appendAbility(id, meta.option.value);
        break;
      case "remove-value":
        removeAbility(id, meta.removedValue.value);
        break;

      default:
        break;
    }
  };

  const equipmentOptions: { [k in EquipmentKey]: OptionType[] } = Object.entries(availableEquipments).reduce(
    (acc, [key, range]) => {
      const values = createValues([range]);
      return {
        ...acc,
        [key]: getValues(values, "inventory"),
      };
    },
    {} as { [k in EquipmentKey]: OptionType[] },
  );

  const equipments = equipmentKeys.map((key) => (
    <div key={key}>
      <Label htmlFor={`${id}.${key}`}>{t(`equipments.${key}`)}</Label>
      <Select
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        placeholder={t("abilityPlaceholder")}
        options={equipmentOptions[key]}
        value={char.equipments[key] ? getValues([char.equipments[key]], "inventory") : []}
        onChange={(e) => {
          setEquipment(id, { key, value: parseInt(String(e?.value), 10) });
        }}
      />
    </div>
  ));

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle className={"text-xl"}>{t(`names.${id}`)}</CardTitle>
      </CardHeader>
      <CardContent className={"space-y-5"}>
        <div>
          <CardTitle className={"text-lg"}>{t("subtitle.stats")}</CardTitle>
          <div className={"grid grid-flow-row-dense grid-cols-4 gap-3"}>{items}</div>
        </div>
        <div>
          <CardTitle className={"text-lg"}>{t("subtitle.equipments")}</CardTitle>
          <div className={"grid grid-flow-row-dense grid-cols-2 gap-3"}>{equipments}</div>
        </div>
        <div>
          <CardTitle className={"text-lg"}>{t("subtitle.abilities")}</CardTitle>
          <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            placeholder={t("abilityPlaceholder")}
            isMulti
            options={abilityOptions}
            value={abilities}
            onChange={handleValueChange}
            isClearable={false}
            closeMenuOnSelect={false}
            isDisabled={isEditingDisabled()}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
