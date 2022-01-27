interface Replacement {
  value: string
  attribute?: string
}

interface TextRange {
  start: number
  end: number
  replacement: Replacement
}

export class StyledString {
  private template: string
  private parametersMapping: Record<string, Replacement>

  constructor(
    template: string,
    parametersMapping: Record<string, Replacement>,
  ) {
    this.template = template
    this.parametersMapping = parametersMapping
  }

  // Public

  /** Split the string in different parts between each parameter */
  public getRanges(): TextRange[] {
    const parametersRanges = this.getParametersRanges()

    // The idea is to iterate through each parameter range (P1, P2, etc)
    // and to create ranges between them.
    // For instance for the string {A}{P1}{B}{P2}{C} we transform [{P1}, {P2}]
    // into [{A},{P1},{B},{P2},{C}]
    const ranges: TextRange[] = parametersRanges.flatMap(
      (parameterRange, index) => {
        const previousParameterRange =
          index > 0 ? parametersRanges[index - 1] : undefined
        return this.buildPreviousRangesFromParameterRange(
          parameterRange,
          previousParameterRange,
        )
      },
    )

    // Append the last range if there is one
    ranges.push(...this.buildLastRange(parametersRanges.pop()))

    return ranges
  }

  // Private

  /** Get ranges for all parameters in the string by start order */
  private getParametersRanges(): TextRange[] {
    return Object.entries(this.parametersMapping)
      .map(([parameter, replacement]) => {
        const stringToSearch = `{{${parameter}}}`
        const start = this.template.indexOf(stringToSearch)
        return {
          start: start,
          end: start + stringToSearch.length - 1,
          replacement,
        }
      })
      .sort((lhs, rhs) => lhs.start - rhs.start)
  }

  private createNonParameterRange(input: {
    start: number
    end: number
  }): TextRange {
    return {
      start: input.start,
      end: input.end,
      replacement: {
        value: this.template.substring(input.start, input.end + 1),
      },
    }
  }

  private buildPreviousRangesFromParameterRange(
    parameterRange: TextRange,
    previousParameterRange: TextRange | undefined,
  ): TextRange[] {
    const ranges: TextRange[] = []

    const previousParameterRangeEnd = previousParameterRange?.end ?? -1
    if (previousParameterRangeEnd < parameterRange.start - 1) {
      // In this case there is a range between the last parameter
      // and the current {PN-1}{A}{PN}
      const rangeBetweenPreviousParameterAndCurrent =
        this.createNonParameterRange({
          start: previousParameterRangeEnd + 1,
          end: parameterRange.start - 1,
        })
      ranges.push(rangeBetweenPreviousParameterAndCurrent)
    }

    ranges.push(parameterRange)

    return ranges
  }

  buildLastRange(lastParameterRange: TextRange | undefined): TextRange[] {
    const ranges: TextRange[] = []
    const lastParameterRangeEnd = lastParameterRange?.end ?? -1
    if (lastParameterRangeEnd < this.template.length - 1) {
      // In this case there is a range after the last parameter
      // {PN}{B}
      const rangeBetweenCurrentAndEndOfString = this.createNonParameterRange({
        start: lastParameterRangeEnd + 1,
        end: this.template.length - 1,
      })
      ranges.push(rangeBetweenCurrentAndEndOfString)
    }
    return ranges
  }
}
