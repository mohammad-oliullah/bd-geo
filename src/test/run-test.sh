#!/usr/bin/env bash

TEST_FILE="src/test/geo.test.ts"

if [ $# -eq 0 ]; then
  echo "Usage:"
  echo "  ./run-test.sh 1"
  echo "  ./run-test.sh 1 2 5"
  echo "  ./run-test.sh '*'"
  exit 1
fi

declare -A TESTS=(
  [1]="should return all 8 divisions"
  [2]="should return all 64 districts"
  [3]="should return upazilas"
  [4]="should return areas"
  [5]="should return villages"

  [6]="getThanas() should return the same data as getUpazilas()"

  [7]="should have unique division IDs"
  [8]="should have unique district IDs"
  [9]="should have unique upazila IDs"
  [10]="should have unique area IDs"
  [11]="should have unique village IDs"

  [12]="should not have duplicate area names of the same type within the same upazila"

  [13]="should have valid district → division relationships"
  [14]="should have valid upazila → district relationships"
  [15]="should have valid area → upazila relationships"
  [16]="should have valid village → area relationships"

  [17]="should only allow villages under union areas"

  [18]="should have valid area types"

  [19]="should have valid upazila types when provided"

  [20]="should contain English names"
  [21]="should contain Bangla names"

  [22]="should not have duplicate district names within the same division"
  [23]="should not have duplicate upazila names within the same district"
  [24]="should not have duplicate area names within the same upazila"

  [25]="should have coordinates within Bangladesh's real bounding box"
)

if [[ "$1" == "*" ]]; then
  npm test -- --run "$TEST_FILE"
  exit $?
fi

PATTERNS=()

for number in "$@"; do
  if [[ -z "${TESTS[$number]}" ]]; then
    echo "Error: Unknown test number: $number"
    exit 1
  fi

  PATTERNS+=("${TESTS[$number]}")
done

for pattern in "${PATTERNS[@]}"; do
  echo "Running: $pattern"

  npm test -- --run "$TEST_FILE" -t "$pattern" || exit $?
done
