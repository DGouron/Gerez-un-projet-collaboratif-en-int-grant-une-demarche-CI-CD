#!/bin/bash

# 🔍 Pre-commit validation script for Backend
# Ce script lance les mêmes vérifications que la CI/CD en local

set -e

echo "🚀 Running backend pre-commit checks..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

print_info() {
    echo -e "${YELLOW}📋 $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo -e "${RED}❌ Please run this script from the back/ directory${NC}"
    exit 1
fi

print_info "Step 1/5: Maven validation"
./mvnw validate > /dev/null 2>&1
print_status $? "Maven configuration is valid"

print_info "Step 2/5: Compilation"
./mvnw clean compile -DskipTests > /dev/null 2>&1
print_status $? "Compilation successful"

print_info "Step 3/5: Running tests"
./mvnw test
print_status $? "All tests passed"

print_info "Step 4/5: Generating coverage report"
./mvnw jacoco:report > /dev/null 2>&1
print_status $? "Coverage report generated"

print_info "Step 5/5: Building JAR package"
./mvnw package -DskipTests > /dev/null 2>&1
print_status $? "JAR package built successfully"

echo -e "${GREEN}🎉 All backend pre-commit checks passed! Ready to commit.${NC}"
echo -e "${YELLOW}💡 Coverage report available at: target/site/jacoco/index.html${NC}" 