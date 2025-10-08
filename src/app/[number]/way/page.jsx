"use client";

import { useState, useEffect, use } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Box, LinearProgress, Typography, Tooltip } from "@mui/material";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Way({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { tel1, tel2, tel3, checkedInter, largeWay, setLargeWay } = useForm();

  const [error, setError] = useState("");

  const handleSelectWay = (e, way) => {
    setLargeWay((prevWay) =>
      prevWay.map((prev) => {
        if (prev.code === way.code) {
          return { ...prev, way: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    router.push(`/${number}/independence`);
  };

  const handleNext = () => {
    if (!largeWay.every((inter) => "way" in inter)) {
      setError("모든 대분류에 대해 기술격차 해소방안을 선택해주세요.");

      return;
    }

    router.push(`/${number}/availability`);
  };

  useEffect(() => {
    if (largeWay.length === 0) {
      setLargeWay(
        checkedInter
          .sort((a, b) => a.id - b.id)
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.code.substring(0, 2) === item.code.substring(0, 2)
              )
          )
          .map((inter) => {
            return {
              tel: tel1 + tel2 + tel3,
              large: inter.large,
              code: inter.code.substring(0, 2),
              intermediates: inter.intermediates,
            };
          })
      );
    }
  }, []);

  return (
    <Form action={handleNext}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={72}
            sx={{ height: 35 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">72%</Typography>
        </Box>
      </Box>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <Heading level={4}>
          3Q-9. (기술격차 해소방안)&nbsp;
          <span className="font-normal">
            선택하신 기술군의 상위 분류인 대분류의 기술격차를 해소하기 위해 가장
            적합한 방안을 선택해주시기
            <br />
            바라며, 해당 방안을 선택하신 이유를 같이 기재해주시기바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ <span className="text-red-400">(!)</span>에 마우스를 올리시면
          대분류에 포함된 중분류 기술 구성을 확인하실 수 있습니다.
        </Text>
        <section className="my-4 border text-center">
          <article className="border-b bg-gray-100 text-lg font-bold leading-8">
            드롭다운 목록
          </article>
          <article className="grid grid-cols-[1fr_1fr_1fr]">
            <div className="border-r border-b">① 정부 R&D 투자 확대</div>
            <div className="border-r border-b">② 민간 R&D 투자 확대</div>
            <div className="border-b">③ 시설장비 활용 가능성 제고</div>
            <div className="border-r border-b">④ 인력 수급 활성화</div>
            <div className="border-r border-b">⑤ 인력 전문성 제고</div>
            <div className="border-b">⑥ 국내 산학연 협력 강화</div>
            <div className="border-r">⑦ 국제공동연구 강화</div>
            <div>⑧ 기타</div>
          </article>
        </section>
        <section className="border-t border-r border-l text-center">
          <article className="grid grid-cols-[1fr_1fr_1fr] bg-gray-100 text-xl font-bold leading-10">
            <div className="border-r border-b">대분류</div>
            <div className="border-r border-b">기술격차 해소방안</div>
            <div className="border-b">선택 이유</div>
          </article>
          {largeWay.map((way, index) => (
            <article key={index} className="grid grid-cols-[1fr_1fr_1fr]">
              <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                {way.large.split(" ").reduce((acc, word, index) => {
                  acc +=
                    (index + 1) % 3 === 0
                      ? `${word}${
                          index !== way.large.split(" ").length - 1
                            ? "\n"
                            : "\t"
                        }`
                      : `${word}\t`;

                  return acc;
                }, "")}
                <Tooltip
                  title={
                    <ul>
                      {way.intermediates.map((intermedite) => (
                        <li key={intermedite.id}>
                          <Typography variant="body1">
                            {intermedite.intermediate}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  }
                  slotProps={{
                    tooltip: {
                      sx: {
                        maxWidth: "none",
                      },
                    },
                  }}
                >
                  <button type="button" className="text-red-400">
                    (!)
                  </button>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2 border-r border-b px-2">
                <Listbox
                  name="way"
                  aria-label="way"
                  defaultValue={way.way}
                  onChange={(e) => handleSelectWay(e, way)}
                  placeholder="클릭하여 선택"
                >
                  <ListboxOption value="1">
                    <ListboxLabel>정부 R&D 투자 확대</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="2">
                    <ListboxLabel>민간 R&D 투자 확대</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="3">
                    <ListboxLabel>시설장비 활용 가능성 제고</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="4">
                    <ListboxLabel>인력 수급 활성화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="5">
                    <ListboxLabel>인력 전문성 제고</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="6">
                    <ListboxLabel>국내 산학연 협력 강화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="7">
                    <ListboxLabel>국제공동연구 강화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="8">
                    <ListboxLabel>기타</ListboxLabel>
                  </ListboxOption>
                </Listbox>
                <Input
                  aria-label="etc"
                  name="etc"
                  className={`${way.way !== "8" && "hidden"}`}
                  value={
                    largeWay.find((ele) => ele.code === way.code)?.etc || ""
                  }
                  onChange={({ target }) =>
                    setLargeWay((prevList) =>
                      prevList.map((prev) => {
                        if (prev.code === way.code) {
                          return { ...prev, etc: target.value };
                        }

                        return prev;
                      })
                    )
                  }
                  required={way.way === "8"}
                />
              </div>
              <div className="flex items-center border-b px-2">
                <Input
                  aria-label="reason"
                  name="reason"
                  value={
                    largeWay.find((ele) => ele.code === way.code)?.reason || ""
                  }
                  onChange={({ target }) =>
                    setLargeWay((prevList) =>
                      prevList.map((prev) => {
                        if (prev.code === way.code) {
                          return { ...prev, reason: target.value };
                        }

                        return prev;
                      })
                    )
                  }
                />
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer className="my-4">
        <div className="text-red-700 text-right">{error}</div>
        <div className="flex justify-end gap-4">
          <Button onClick={handlePrev}>이전</Button>
          <Button type="submit">다음</Button>
        </div>
      </footer>
    </Form>
  );
}
